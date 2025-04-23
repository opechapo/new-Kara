import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please connect your wallet.');
      setIsLoading(false);
      return;
    }
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch all notifications
      const notificationsResponse = await fetch('http://localhost:3000/notifications/all', { headers, credentials: 'include' });
      const notificationsResult = await notificationsResponse.json();
      if (!notificationsResponse.ok) throw new Error(notificationsResult.message || 'Failed to fetch notifications');

      // Fetch all users
      const usersResponse = await fetch('http://localhost:3000/users/all', { headers, credentials: 'include' });
      const usersResult = await usersResponse.json();
      if (!usersResponse.ok) throw new Error(usersResult.message || 'Failed to fetch users');

      setNotifications(notificationsResult.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setUsers(usersResult.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      if (err.message.includes('Admin access')) navigate('/profile'); // Redirect non-admins
    }
  };

  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8 pt-24">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">All Notifications</h2>
            {notifications.length === 0 ? (
              <p className="text-gray-600">No notifications yet.</p>
            ) : (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li key={notification._id} className="border-b py-2">
                    <p className="font-semibold">
                      {notification.user?.walletAddress 
                        ? `${notification.user.walletAddress.slice(0, 6)}...${notification.user.walletAddress.slice(-4)}` 
                        : 'Unknown Wallet'}
                    </p>
                    <p>{notification.message}</p>
                    <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            {users.length === 0 ? (
              <p className="text-gray-600">No users yet.</p>
            ) : (
              <ul className="space-y-2">
                {users.map((user) => (
                  <li key={user._id} className="border-b py-2">
                    <p>{user.walletAddress}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProfile;