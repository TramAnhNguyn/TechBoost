// Create a Dashboard.jsx page that shows the user's enrolled courses
// Each course card displays title, image, progress bar (based on completed lessons), and a "Continue learning" button
// Fetch from `${VITE_API_URL}/users/me`
import React, { useState, useEffect } from 'react';
import { FaBook, FaArrowRight, FaClock, FaMedal, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import defaultAvatar from "../assets/avatar/avt1.jpg";
import { useAuth } from '../context/AuthContext';

const Link = ({ to, children }) => (
  <a href={to} style={{ textDecoration: 'none' }}>
    {children}
  </a>
);

function Dashboard() {
  const { authData, isAuthenticated, logout, setAuthData } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

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

  const categoryData = [
    { name: 'Frontend', value: 3 },
    { name: 'Backend', value: 2 },
  ];

  const learningTimeData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.0 },
    { day: 'Fri', hours: 1.5 },
    { day: 'Sat', hours: 4.2 },
    { day: 'Sun', hours: 3.7 },
  ];

  const COLORS = ['#4285F4', '#0F9D58'];

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: authData?.user?.name,
        email: authData?.user?.email,
        avatar: defaultAvatar,
        totalCourses: 5,
        completedCourses: 2,
        totalHours: 50,
        lastActive: '2 hours ago',
        streak: 7,
        enrolledCourses: [
          {
            _id: '1',
            title: 'React for Beginners',
            image: '/images/courses/react.png',
            description: 'Learn the fundamentals of React from scratch',
            instructor: 'Sarah Chen',
            completedLessons: [1, 2, 3, 4, 5],
            lessons: [1, 2, 3, 4, 5, 6, 7, 8],
            lastAccessed: '2023-05-05T14:48:00.000Z',
            category: 'Frontend',
          },
          {
            _id: '2',
            title: 'Advanced JavaScript Patterns',
            image: '/images/courses/js.png',
            description: 'Master advanced JavaScript concepts',
            instructor: 'Michael Brown',
            completedLessons: [1, 2],
            lessons: [1, 2, 3, 4, 5, 6],
            lastAccessed: '2023-05-04T10:30:00.000Z',
            category: 'Frontend',
          },
          {
            _id: '3',
            title: 'Node.js API Development',
            image: '/images/courses/nodejs.png',
            description: 'Build robust backend services with Node.js',
            instructor: 'David Lee',
            completedLessons: [1],
            lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            lastAccessed: '2023-05-02T16:20:00.000Z',
            category: 'Backend',
          },
          {
            _id: '4',
            title: 'TypeScript Essentials',
            image: '/images/courses/ts.png',
            description: 'Get started with TypeScript for scalable applications',
            instructor: 'Emma Wilson',
            completedLessons: [1, 2, 3],
            lessons: [1, 2, 3, 4, 5],
            lastAccessed: '2023-05-03T09:15:00.000Z',
            category: 'Frontend',
          },
          {
            _id: '5',
            title: 'Express.js Fundamentals',
            image: '/images/courses/express.webp',
            description: 'Learn to build APIs with Express.js',
            instructor: 'John Smith',
            completedLessons: [],
            lessons: [1, 2, 3, 4, 5, 6],
            lastAccessed: '2023-05-01T12:00:00.000Z',
            category: 'Backend',
          },
        ],
        achievements: [
          { id: 1, title: 'Fast Learner', description: 'Completed 5 lessons in one day', icon: '🚀' },
          { id: 2, title: 'Streak Master', description: 'Maintained a 7-day learning streak', icon: '🔥' },
          { id: 3, title: 'Quiz Wizard', description: 'Scored 100% on 3 consecutive quizzes', icon: '🧙' },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const coursesWithProgress = user.enrolledCourses.map(course => {
    const completedLessons = course.completedLessons?.length || 0;
    const totalLessons = course.lessons?.length || 1;
    const progress = (completedLessons / totalLessons) * 100;
    return {
      ...course,
      progress: Math.round(progress),
    };
  });

  return (
    <div className="py-6 mb-20 mt-12">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-4 rounded-lg mx-4 lg:mx-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4">
              <img 
                src={defaultAvatar} 
                alt="Profile" 
                className="w-16 h-16 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-blue-100">Last active: {user.lastActive}</p>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{user.totalCourses}</p>
              <p className="text-sm text-blue-100">Courses</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{user.totalHours}</p>
              <p className="text-sm text-blue-100">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{user.streak}</p>
              <p className="text-sm text-blue-100">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 border-b">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'courses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('courses')}
        >
          My Courses
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('stats')}
        >
          Learning Stats
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* My Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">My Enrolled Courses</h3>
              <Link to="/courses">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-300">
                  Explore More Courses
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesWithProgress.map(course => (
                <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800">{course.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Instructor: {course.instructor}</p>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{course.progress}% Complete</p>
                    </div>
                    <Link to={`/courses/${course._id}`}>
                      <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800 font-medium">
                        Continue Learning <FaArrowRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Learning Statistics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Course Categories</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Weekly Learning Time</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={learningTimeData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#4285F4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.achievements.map(achievement => (
                <div key={achievement.id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <div className="text-3xl mr-4">{achievement.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;