import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import logo from '../assets/logo/logo.svg';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) {
  if (!isOpen) return null;
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login({ email, password });
      const { token, ...user } = data;
      login({ user, token });
      onLoginSuccess({ user, token });
      onClose(); 
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');  
    } finally {
      if (error.response) {
        console.error('Error response:', error.response); 
      }
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm animate-fade-in" onClick={handleClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10 z-[61]">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 mb-6 rounded-full shadow-md bg-white p-2">
            <img src={logo} alt="TechBoost Logo" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text mb-2">
            Login
          </h2>
          <p className="text-sm text-gray-500 mb-8">Continue your learning journey</p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="relative group">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 pl-12 pr-12 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all duration-300 font-semibold"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}