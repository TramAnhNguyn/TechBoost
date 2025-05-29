const express = require('express');
const router = express.Router();

const {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/Lesson.controller');

router.get('/:id', getLessonById);
router.post('/', createLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

module.exports = router;
