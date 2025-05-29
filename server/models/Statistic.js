const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  totalEnrollments: { type: Number, default: 0 },
  averageCompletion: { type: Number, default: 0 },
  totalView: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Statistic', statisticSchema);
