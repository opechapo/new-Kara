import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateProduct = () => {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    price: '',
    amount: '',
    category: '',
    paymentToken: '',
    storeId: '',
    collection: '',
    escrowSystem: 'Deposit',
    vendorDeposit: '',
    customerDeposit: '',
    generalImage: null,
  });
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please connect your wallet.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch product');
      setFormData({
        name: data.name,
        shortDescription: data.shortDescription,
        price: data.price,
        amount: data.amount,
        category: data.category,
        paymentToken: data.paymentToken,
        storeId: data.storeId,
        collection: data.collection?._id || '',
        escrowSystem: data.escrowSystem,
        vendorDeposit: data.vendorDeposit || '',
        customerDeposit: data.customerDeposit || '',
        generalImage: null, // File input starts empty; existing image is kept unless updated
      });
      fetchCollections(data.storeId);
    } catch (err) {
      console.error('Fetch product error:', err.message);
      setError(err.message);
    }
  };

  const fetchCollections = async (storeId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/collections/store/${storeId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch collections');
      setCollections(data);
    } catch (err) {
      console.error('Fetch collections error:', err.message);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, generalImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please connect your wallet.');
      setLoading(false);
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      if (key !== 'generalImage') form.append(key, formData[key]);
    }
    if (formData.generalImage) form.append('generalImage', formData.generalImage);

    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: form,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update product');
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate(`/product/${productId}`), 2000);
    } catch (err) {
      console.error('Update product error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/my-products`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute top-16 left-0 pl-4 z-[60]">
          <button onClick={handleBack} className="text-gray-700 hover:text-purple-900 text-2xl p-2 rounded-full">
            <FaArrowLeft />
          </button>
        </div>
        <div className="max-w-md mx-auto mt-20 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Update Product</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {loading && <p className="text-gray-600 mb-4">Updating product...</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 border rounded"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Smart Phones & Tabs">Smart Phones & Tabs</option>
                <option value="Homes & Gardens">Homes & Gardens</option>
                <option value="Fashion">Fashion</option>
                <option value="Vehicles">Vehicles</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Payment Token</label>
              <input
                type="text"
                name="paymentToken"
                value={formData.paymentToken}
                onChange={handleChange}
                placeholder="Payment Token (e.g., ETH)"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Collection</label>
              <select
                name="collection"
                value={formData.collection}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Collection</option>
                {collections.map(collection => (
                  <option key={collection._id} value={collection._id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Escrow System</label>
              <select
                name="escrowSystem"
                value={formData.escrowSystem}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Deposit">Deposit</option>
                <option value="Guarantor">Guarantor</option>
              </select>
            </div>
            {formData.escrowSystem === 'Deposit' && (
              <>
                <div>
                  <label className="block text-gray-700">Vendor Deposit</label>
                  <input
                    type="number"
                    name="vendorDeposit"
                    value={formData.vendorDeposit}
                    onChange={handleChange}
                    placeholder="Vendor Deposit"
                    className="w-full p-2 border rounded"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Customer Deposit</label>
                  <input
                    type="number"
                    name="customerDeposit"
                    value={formData.customerDeposit}
                    onChange={handleChange}
                    placeholder="Customer Deposit"
                    className="w-full p-2 border rounded"
                    step="0.01"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-gray-700">General Image (optional)</label>
              <input
                type="file"
                name="generalImage"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-900 text-white p-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProduct;