// scripts/seedLessons.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

function generateLessons(course, count = 10) {
  return Array.from({ length: count }).map((_, i) => ({
    title: `Lesson ${i + 1}`,
    content: `This is the content of lesson ${i + 1} for course "${course.title}"`,
    order: i + 1,
    courseId: course._id,
    linkvideo: `https://placehold.co/640x360?text=Lesson+${i + 1}`
  }));
}

async function seedLessons() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techboost');
    console.log('✅ Đã kết nối MongoDB');

    const courses = await Course.find();
    if (!courses.length) throw new Error('Không tìm thấy khóa học nào');

    await Lesson.deleteMany();

    for (const course of courses) {
      const lessons = generateLessons(course);
      const insertedLessons = await Lesson.insertMany(lessons);
      course.lessons = insertedLessons.map((l) => l._id);
      await course.save();
      console.log(`✅ Đã thêm ${insertedLessons.length} bài học cho khóa ${course.title}`);
    }

    await mongoose.disconnect();
    console.log('✅ Đã hoàn tất thêm bài học');
  } catch (err) {
    console.error('❌ Lỗi khi thêm bài học:', err.message);
  }
}

seedLessons();
