import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import axios from 'axios';
import logo from '../assets/logo/logo.svg';

export default function Register({ isOpen, onClose, onSwitchToLogin }) {
  if (!isOpen) return null;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        name : username,
        email,
        password,
      });

      console.log('Registration result:', response.data);
      localStorage.setItem('token', response.data.token || '');
      alert('Registration successful!');
      
      onClose();
      onSwitchToLogin();
    } catch (error) {
      console.error('Registration failed:', error.response || error);
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10 transform transition-all duration-500 scale-100 hover:scale-105 z-[61]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full shadow-md bg-white p-2">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-8">Join to start your learning journey</p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleRegister} className="w-full space-y-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all duration-300 group-hover:shadow-sm"
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all duration-300 group-hover:shadow-sm"
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-12 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all duration-300 group-hover:shadow-sm"
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl shadow-md hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}