import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaGlobe, FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

import courseImages from '../assets/courseImages';


function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
        setCourses(() => response.data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch courses');
        toast.error(err.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center mt-5 text-lg text-blue-500">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-red-500 font-bold">{error}</div>;

  return (
    <div className="mt-5 py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center mb-12 text-3xl font-bold text-blue-600">
          <FaStar className="inline-block mr-2 text-yellow-400" />
          Discover Our Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {courses?.map((course, index) => (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="h-full bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={courseImages[index % courseImages.length]}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h5 className="text-lg font-semibold">{course.title}</h5>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm flex items-center">
                    <FaChalkboardTeacher className="mr-1" />
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-400 text-white rounded-full text-sm flex items-center">
                    <FaGlobe className="mr-1" />
                    {course.language}
                  </span>
                </div>
                <Link to={`/courses/${course._id}?img=${index}`}>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default CourseList;
