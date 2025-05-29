import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courseAPI } from '../services/api';
import { toast } from 'react-toastify';
import courseImages from '../assets/courseImages';

const useQuery = () => new URLSearchParams(useLocation().search);

const CourseDetail = () => {
  const { id } = useParams();
  const query = useQuery();
  const imgIndex = parseInt(query.get('img')) || 0;
  const courseImage = courseImages[imgIndex] || courseImages[0];

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseAPI.getCourseById(id);
        setCourse(data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await courseAPI.enrollCourse(id);
      toast.success("Successfully enrolled in course!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to enroll in course");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="text-center mt-10 text-blue-500 font-semibold">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!course) return <div className="text-center mt-10 text-gray-500">No course found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-xl overflow-hidden"
      >
        <div className="flex justify-center py-4">
          <img
            src={courseImage}
            alt={course.title}
            className="object-contain max-w-[300px] max-h-[180px] rounded-lg"
          />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              {course.level}
            </span>
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
              {course.language}
            </span>
            {course.flags?.map((flag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm"
              >
                {flag}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-700">Lessons</h2>
          {course.lessons?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 relative group"
                >
                  <strong className="text-blue-600 mr-2">{lesson.order}.</strong>
                  <span className="text-gray-800">{lesson.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No lessons available yet.</p>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>

            <Link to={`/courses/${id}/learn`} className="flex-1">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Start Learning
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetail;
