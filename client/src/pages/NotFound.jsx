import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="py-12 mt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300">
              <FaHome className="mr-2" />
              Go Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;
