const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  level: String,
  language: String,
  image: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  categories: [{ title: String, icon: String }],
  flags: [String],

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema, 'courses');

module.exports = Course;
