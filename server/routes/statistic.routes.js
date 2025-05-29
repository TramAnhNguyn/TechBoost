const express = require('express');
const router = express.Router();
const {
  getAllStatistics,
  getStatisticByCourse,
  createOrUpdateStatistic
} = require('../controllers/Statistic.controller');

router.get('/', getAllStatistics);
router.get('/course/:courseId', getStatisticByCourse);
router.post('/course/:courseId', createOrUpdateStatistic);

module.exports = router; 