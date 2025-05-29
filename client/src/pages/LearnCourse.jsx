// Create a LearnCourse.jsx component that loads a lesson by ID from `${VITE_API_URL}/lessons/:id`
// Show video (placeholder image), lesson title, content, and "Mark as completed" button
// Add Next / Previous buttons to navigate lessons in the course
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';

function LearnCourse() {
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, lessonId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course data to get all lessons
        const courseResponse = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`);
        if (!courseResponse.ok) throw new Error('Course not found');
        const courseData = await courseResponse.json();
        setCourse(courseData);

        // Fetch current lesson
        const lessonResponse = await fetch(`${import.meta.env.VITE_API_URL}/lessons/${lessonId}`);
        if (!lessonResponse.ok) throw new Error('Lesson not found');
        const lessonData = await lessonResponse.json();
        setLesson(lessonData);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, lessonId]);

  const handleMarkCompleted = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons/${lessonId}/complete`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to mark lesson as completed');
      toast.success('Lesson marked as completed!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const navigateToLesson = (lessonId) => {
    navigate(`/courses/${id}/learn/${lessonId}`);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-red-500">{error}</div>;
  if (!lesson || !course) return <div className="text-center mt-5">No lesson found</div>;

  const currentLessonIndex = course.lessons.findIndex(l => l._id === lessonId);
  const previousLesson = course.lessons[currentLessonIndex - 1];
  const nextLesson = course.lessons[currentLessonIndex + 1];
  const progress = ((currentLessonIndex + 1) / course.lessons.length) * 100;

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={lesson.videoUrl || 'placeholder-image-url'} 
              alt={lesson.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-8">
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}% Complete</p>
              </div>
              
              <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
              <p className="text-gray-600 mb-8">{lesson.content}</p>

              <div className="flex justify-between items-center">
                <button
                  className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!previousLesson}
                  onClick={() => previousLesson && navigateToLesson(previousLesson._id)}
                >
                  <FaArrowLeft className="mr-2" />
                  Previous Lesson
                </button>

                <button 
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={handleMarkCompleted}
                >
                  <FaCheck className="mr-2" />
                  Mark as Completed
                </button>

                <button
                  className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!nextLesson}
                  onClick={() => nextLesson && navigateToLesson(nextLesson._id)}
                >
                  Next Lesson
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LearnCourse;
