const Statistic = require('../models/Statistic');

const getAllStatistics = async (req, res) => {
  try {
    const statistics = await Statistic.find();
    res.status(200).json({ success: true, data: statistics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStatisticByCourse = async (req, res) => {
  try {
    const statistic = await Statistic.findOne({ courseId: req.params.courseId });
    if (!statistic) {
      return res.status(404).json({ success: false, message: 'Statistic not found' });
    }
    res.status(200).json({ success: true, data: statistic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createOrUpdateStatistic = async (req, res) => {
  try {
    const { courseId, totalEnrollments, averageCompletion, totalView } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'CourseId is required'
      });
    }

    const update = {
      totalEnrollments,
      averageCompletion,
      totalView,
      lastUpdated: Date.now()
    };

    const statistic = await Statistic.findOneAndUpdate(
      { courseId },
      update,
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: statistic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const incrementViews = async (req, res) => {
  try {
    const statistic = await Statistic.findOneAndUpdate(
      { courseId: req.params.courseId },
      { 
        $inc: { totalView: 1 },
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!statistic) {
      return res.status(404).json({ success: false, message: 'Statistic not found' });
    }

    res.status(200).json({ success: true, data: statistic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const incrementEnrollments = async (req, res) => {
  try {
    const statistic = await Statistic.findOneAndUpdate(
      { courseId: req.params.courseId },
      { 
        $inc: { totalEnrollments: 1 },
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!statistic) {
      return res.status(404).json({ success: false, message: 'Statistic not found' });
    }

    res.status(200).json({ success: true, data: statistic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCompletion = async (req, res) => {
  try {
    const { averageCompletion } = req.body;

    if (typeof averageCompletion !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Average completion must be a number'
      });
    }

    const statistic = await Statistic.findOneAndUpdate(
      { courseId: req.params.courseId },
      { 
        averageCompletion,
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!statistic) {
      return res.status(404).json({ success: false, message: 'Statistic not found' });
    }

    res.status(200).json({ success: true, data: statistic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllStatistics,
  getStatisticByCourse, 
  createOrUpdateStatistic,
  incrementViews,
  incrementEnrollments,
  updateCompletion
};
