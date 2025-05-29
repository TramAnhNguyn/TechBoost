import React, { useState, useEffect } from "react";
import { Search, Menu, X, ChevronDown, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.svg";
import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../assets/avatar/avt1.jpg";
import axios from "axios";

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [courseResults, setCourseResults] = useState([]);
  const navigate = useNavigate();
  const { authData, logout } = useAuth(); 
  const user = authData?.user; 

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchText.trim()) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
          const filtered = response.data.data.filter((c) =>
            c.title.toLowerCase().includes(searchText.toLowerCase())
          );
          setCourseResults(filtered);
        } catch (err) {
          console.error("Search failed", err);
        }
      } else {
        setCourseResults([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchText]);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-blue-600">TechBoost</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-6 relative">
            <div className="relative w-64">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 rounded-full border bg-white border-gray-300 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

              {searchText && courseResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md border z-50">
                  {courseResults.map((course, index) => (
                    <Link
                      key={course._id}
                      to={`/courses/${course._id}?img=${index}`}
                      onClick={() => setSearchText('')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="text-gray-700 font-medium">About</Link>
            <Link to="/courses" className="text-gray-700 font-medium">Courses</Link>

            {user ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-2 hover:text-blue-600">
                  <img
                    src={user?.avatarUrl || defaultAvatar}
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50"
                    >
                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button onClick={onLoginClick} className="text-gray-700 font-medium">Login</button>
                <button
                  onClick={onRegisterClick}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}

            <Link to="/dashboard">
              <BookOpen className="h-6 w-6 text-gray-600 cursor-pointer" />
            </Link>
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
