const Lesson = require('../models/Lesson');

const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId })
      .sort({ order: 1 });
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createLesson = async (req, res) => {
  try {
    const { title, content, order, courseId, linkvideo } = req.body;

    if (!title || !courseId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and courseId are required' 
      });
    }

    const lesson = new Lesson({
      title,
      content,
      order,
      courseId,
      linkvideo
    });

    const savedLesson = await lesson.save();
    res.status(201).json({ success: true, data: savedLesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const { title, content, order, courseId, linkvideo } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { 
        title,
        content,
        order,
        courseId,
        linkvideo
      },
      { new: true, runValidators: true }
    );

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    res.status(200).json({ success: true, message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getLessonsByCourse, getLessonById, createLesson, updateLesson, deleteLesson };
