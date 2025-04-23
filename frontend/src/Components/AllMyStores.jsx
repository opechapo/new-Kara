import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllMyStores = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');
  const [editStore, setEditStore] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slogan: '',
    bannerImage: null,
    featuredImage: null,
    logo: null,
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please connect your wallet to view your stores.');
      return;
    }
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('http://localhost:3000/stores', {
        headers,
        credentials: 'include',
      });
      console.log('AllMyStores: Response status:', response.status);
      const data = await response.json();
      console.log('AllMyStores: Stores data:', data);
      if (!response.ok) throw new Error(data.message || 'Failed to fetch stores');
      setStores(data);
    } catch (err) {
      console.error('AllMyStores: Fetch error:', err.message);
      setError(err.message);
    }
  };

  const handleUpdateClick = (store) => {
    setEditStore(store);
    setFormData({
      name: store.name,
      description: store.description,
      slogan: store.slogan,
      bannerImage: null,
      featuredImage: null,
      logo: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !editStore) return;

    const updateData = new FormData();
    updateData.append('name', formData.name);
    updateData.append('description', formData.description);
    updateData.append('slogan', formData.slogan);
    if (formData.bannerImage) updateData.append('bannerImage', formData.bannerImage);
    if (formData.featuredImage) updateData.append('featuredImage', formData.featuredImage);
    if (formData.logo) updateData.append('logo', formData.logo);

    try {
      const response = await fetch(`http://localhost:3000/stores/${editStore._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: updateData,
      });
      console.log('AllMyStores: Update response status:', response.status);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update store');
      setStores(stores.map(s => (s._id === editStore._id ? data : s)));
      setEditStore(null);
      setFormData({ name: '', description: '', slogan: '', bannerImage: null, featuredImage: null, logo: null });
    } catch (err) {
      console.error('AllMyStores: Update error:', err.message);
      setError(err.message);
    }
  };

  const handleDelete = async (storeId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/stores/${storeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });
      console.log('AllMyStores: Delete response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete store');
      }
      setStores(stores.filter(s => s._id !== storeId));
    } catch (err) {
      console.error('AllMyStores: Delete error:', err.message);
      setError(err.message);
    }
  };

  // Helper function to normalize image paths
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith('/uploads/')
      ? `http://localhost:3000${imagePath}`
      : `http://localhost:3000/uploads/${imagePath}`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Stores</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {editStore ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Update Store: {editStore.name}</h2>
          <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Slogan</label>
              <input
                type="text"
                name="slogan"
                value={formData.slogan}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Banner Image</label>
              <input type="file" name="bannerImage" onChange={handleFileChange} className="w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Featured Image</label>
              <input type="file" name="featuredImage" onChange={handleFileChange} className="w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Logo</label>
              <input type="file" name="logo" onChange={handleFileChange} className="w-full" />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditStore(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.length > 0 ? (
            stores.map(store => (
              <div key={store._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{store.name}</h3>
                <p className="text-gray-600">{store.description}</p>
                <p className="text-gray-500 italic">{store.slogan}</p>
                {store.bannerImage && (
                  <img
                    src={getImageUrl(store.bannerImage)}
                    alt="Banner"
                    className="mt-2 w-full h-32 object-cover"
                    onError={(e) => console.error('Store banner image load error:', store.bannerImage)}
                  />
                )}
                {store.featuredImage && (
                  <img
                    src={getImageUrl(store.featuredImage)}
                    alt="Featured"
                    className="mt-2 w-full h-32 object-cover"
                    onError={(e) => console.error('Store featured image load error:', store.featuredImage)}
                  />
                )}
                {store.logo && (
                  <img
                    src={getImageUrl(store.logo)}
                    alt="Logo"
                    className="mt-2 w-16 h-16 object-cover"
                    onError={(e) => console.error('Store logo image load error:', store.logo)}
                  />
                )}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleUpdateClick(store)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(store._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No stores found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllMyStores;