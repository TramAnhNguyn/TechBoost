import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import About from './pages/About';
import LearnLesson from './pages/LearnLesson';
import LearnCourse from './pages/LearnCourse';

const AppContent = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { setAuthData } = useAuth();

  return (
    <>
      <Navbar
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onLoginSuccess={(auth) => {
          console.log("Received auth from API:", auth);
          setAuthData(auth);
          setIsLoginOpen(false);
        }}
      />

      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/courses/:courseId/learn" element={<LearnCourse />} />
          <Route path="/courses/:courseId/learn/:lessonId" element={<LearnLesson />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <AppContent />
      </div>
    </AuthProvider>
  </Router>
);

export default App;
