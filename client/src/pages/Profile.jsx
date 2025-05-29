// Create a Profile.jsx page that displays the logged-in user's name, email, and role.
// Allow user to update avatar image URL (just a text input).
// Add a form to change password with fields: old password, new password, confirm new password.
// Submit changes using axios PUT to `${VITE_API_URL}/users/me`
// Show success or error messages using Bootstrap alerts.
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  
import { userAPI } from '../services/api';

function Profile() {
  const { authData, isAuthenticated, logout, setAuthData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${authData?.token}`
        }
      });
      console.log('User data:', response.data);
      setAvatarUrl(response.data.avatarUrl || '');
  
      if (JSON.stringify(response.data) !== JSON.stringify(authData?.user)) {
        setAuthData({ ...authData, user: response.data });
      }
  
    } catch (err) {
      toast.error('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData(); 
    } else {
      setLoading(false); 
    }
  }, [isAuthenticated]);

  // const updateProfile = async (updates) => {
  //   try {
  //     await axios.put(
  //       `${import.meta.env.VITE_API_URL}/users/me`,
  //       updates,
  //       { withCredentials: true }
  //     );
  //     await fetchUserData();
  //     toast.success('Profile updated successfully');
  //     setOldPassword('');
  //     setNewPassword('');
  //     setConfirmPassword('');
  //     setError('');
  //     setShowModal(false);
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Failed to update profile');
  //   }
  // };

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    try {
      await userAPI.updateProfile({ avatarUrl });
      await fetchUserData();
      toast.success('Avatar updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update avatar');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
  
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
  
    try {
      await userAPI.changePassword({ oldPassword, newPassword });
      toast.success('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl text-gray-600">Loading...</div>;
  } else {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-lg text-gray-900">{authData?.user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg text-gray-900">{authData?.user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-lg text-gray-900">{authData?.user?.role}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Avatar</h3>
              <form onSubmit={handleAvatarUpdate} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Enter avatar URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                  Update
                </button>
              </form>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Password Change Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h3>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                  {error}
                </div>
              )}
              <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}}

export default Profile;