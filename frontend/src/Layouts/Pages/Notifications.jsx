import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();

    // Polling for real-time updates
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please connect your wallet to view notifications.');
      setIsLoading(false);
      return;
    }
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await fetch('http://localhost:3000/notifications', { headers, credentials: 'include' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch notifications');
      const sortedNotifications = (result.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8 pt-24">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Your Notifications</h1>
          {notifications.length === 0 ? (
            <p className="text-gray-600">No notifications yet.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification._id} className="border-b py-2">
                  <p>
                    {notification.type === 'store' && (
                      <Link to={`/store/${notification.entityId}`} className="text-purple-900 hover:underline">
                        {notification.message}
                      </Link>
                    )}
                    {notification.type === 'collection' && (
                      <Link to={`/collections/${notification.entityId}`} className="text-purple-900 hover:underline">
                        {notification.message}
                      </Link>
                    )}
                    {notification.type === 'product' && (
                      <Link to={`/product/${notification.entityId}`} className="text-purple-900 hover:underline">
                        {notification.message}
                      </Link>
                    )}
                    {notification.type === 'escrow' && (
                      <Link to={`/profile`} className="text-purple-900 hover:underline">
                        {notification.message}
                      </Link>
                    )}
                    {!['store', 'collection', 'product', 'escrow'].includes(notification.type) && notification.message}
                  </p>
                  <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;