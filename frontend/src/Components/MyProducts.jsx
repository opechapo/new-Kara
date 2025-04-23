import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { FaSpinner } from 'react-icons/fa';

const MyProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getImageUrl = (path) => {
    const baseUrl = 'http://localhost:3000';
    const fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
    return path ? `${baseUrl}${path}` : fallbackImage;
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please connect your wallet to view your products.');
      setIsLoading(false);
      return;
    }
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('http://localhost:3000/products/user', { headers, credentials: 'include' });
      const productsData = await response.json();
      if (!response.ok) throw new Error(productsData.message || 'Failed to fetch products');
      setProducts(productsData);
      setIsLoading(false);
    } catch (err) {
      console.error('MyProducts: Fetch error:', err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please connect your wallet.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });
      if (!response.ok) {
        const text = await response.text();
        let message;
        try {
          const data = JSON.parse(text);
          message = data.message || 'Failed to delete product';
        } catch {
          message = 'Server returned an unexpected response';
        }
        throw new Error(message);
      }
      const data = await response.json();
      setProducts(products.filter(product => product._id !== productId));
      alert(data.message || 'Product deleted successfully!');
    } catch (err) {
      console.error('Delete product error:', err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) return <div className="text-red-500 p-6 w-full">{error}</div>;
  if (isLoading) {
    return (
      <div className="p-6 w-full flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-purple-900 text-4xl" />
      </div>
    );
  }

  return (
    <>
      <Header /> 
      <div className="min-h-screen p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="flex flex-col items-center">
                <Link to={`/product/${product._id}`} className="cursor-pointer group">
                  <div className="w-40 h-40 bg-gray-100 rounded-md overflow-hidden transition-transform group-hover:scale-105">
                    <img
                      src={getImageUrl(product.generalImage)}
                      alt={product.name || 'Product image'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = getImageUrl(null);
                      }}
                    />
                  </div>
                  <p className="mt-2 text-gray-800 font-medium text-center transition-colors group-hover:text-purple-700">
                    {product.name}
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">
                    {product.price} {product.paymentToken}
                  </p>
                </Link>
                <div className="mt-2 flex space-x-2">
                  <Link
                    to={`/update-product/${product._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No products created yet.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyProducts;