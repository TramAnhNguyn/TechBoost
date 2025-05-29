const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  order: Number,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  linkvideo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);