const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getMe,
  getUserById,
  login,
  register,
  enrollCourse,
  completeLesson,
  updateProfile
} = require('../controllers/User.controller');

const protect = require('../middlewares/auth');

router.post('/login', login);
router.post('/register', register);

router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.post('/enroll/:courseId', protect, enrollCourse);
router.post('/complete-lesson', protect, completeLesson);

router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);

module.exports = router;
