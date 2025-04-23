import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { FaSpinner } from 'react-icons/fa';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:3000';

  const getImageUrl = (path) => {
    const fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
    return path ? `${API_BASE_URL}${path}` : fallbackImage;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!category) {
          throw new Error('No category specified');
        }

        let apiCategory;
        switch (category.toLowerCase()) {
          case 'electronics':
            apiCategory = 'Electronics';
            break;
          case 'smartphonestabs':
            apiCategory = 'Smart Phones & Tabs';
            break;
          case 'homeandgarden':
            apiCategory = 'Homes & Gardens';
            break;
          case 'fashion':
            apiCategory = 'Fashion';
            break;
          case 'vehicles':
            apiCategory = 'Vehicles';
            break;
          default:
            apiCategory = category; // Fallback to param if unknown
        }

        const token = localStorage.getItem('token');
        const response = await fetch(
          `${API_BASE_URL}/products/public?category=${encodeURIComponent(apiCategory)}`,
          {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            credentials: 'include',
          }
        );
        console.log('CategoryProducts fetch status:', response.status, response.statusText);
        const data = await response.json();
        console.log('CategoryProducts data:', JSON.stringify(data, null, 2));
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products');
        }
        setProducts(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const displayCategory = () => {
    if (!category) return 'Unknown Category';
    switch (category.toLowerCase()) {
      case 'electronics': return 'Electronics';
      case 'smartphonestabs': return 'Smart Phones & Tabs';
      case 'homeandgarden': return 'Homes & Gardens';
      case 'fashion': return 'Fashion';
      case 'vehicles': return 'Vehicles';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="p-6 w-full flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-purple-900 text-4xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-6 w-full text-center text-lg">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-24 px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {displayCategory()} Products
        </h1>
        {products.length > 0 ? (
          <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="hover:scale-105 transition-transform">
                <div className="min-w-[250px]">
                  <div className="w-60 h-60 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={getImageUrl(product.generalImage)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = getImageUrl(null);
                        console.error('Image load error for product:', product._id);
                      }}
                    />
                  </div>
                  <div className="bg-white p-4 shadow-md rounded-lg mt-2">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.shortDescription}</p>
                    <p className="text-md font-bold text-blue-600 mt-1">
                      {product.price} {product.paymentToken || 'ETH'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products found in this category.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryProducts;