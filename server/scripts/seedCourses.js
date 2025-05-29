// scripts/seedCourses.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Course = require('../models/Course');
const User = require('../models/User');

const sampleCourses = [
  {
    title: "ReactJS for Beginners",
    description: "Learn the fundamentals of React including components, hooks, and routing.",
    level: "Beginner",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "React", icon: "" },
      { title: "JavaScript", icon: "" }
    ],
    link: "https://example.com/reactjs"
  },
  {
    title: "Fullstack with Node.js & MongoDB",
    description: "Build scalable backend APIs using Node.js and MongoDB.",
    level: "Intermediate",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "Node", icon: "" },
      { title: "MongoDB", icon: "" }
    ],
    link: "https://example.com/nodejs"
  },
  {
    title: "Modern Web Development with Django",
    description: "Master Django for backend development and build full web apps.",
    level: "Intermediate",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "Django", icon: "" },
      { title: "Python", icon: "" }
    ],
    link: "https://example.com/django"
  },
  {
    title: "Intro to HTML & CSS",
    description: "Learn the building blocks of the web with HTML and CSS.",
    level: "Beginner",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "HTML", icon: "" },
      { title: "CSS", icon: "" }
    ],
    link: "https://example.com/htmlcss"
  },
  {
    title: "Python for Data Analysis",
    description: "Explore data with Python using libraries like Pandas and Matplotlib.",
    level: "Intermediate",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "Python", icon: "" }
    ],
    link: "https://example.com/python-data"
  },
  {
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript including closures, prototypes, and async programming.",
    level: "Advanced",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "JavaScript", icon: "" }
    ],
    link: "https://example.com/js-advanced"
  },
  {
    title: "Introduction to TypeScript",
    description: "Learn TypeScript and how to integrate it with modern JavaScript frameworks.",
    level: "Beginner",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "TypeScript", icon: "" },
      { title: "JavaScript", icon: "" }
    ],
    link: "https://example.com/typescript"
  },
  {
    title: "DevOps with Docker",
    description: "Master containerization using Docker for modern development.",
    level: "Intermediate",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "Docker", icon: "" }
    ],
    link: "https://example.com/docker"
  },
  {
    title: "Git & GitHub Essentials",
    description: "Version control your code and collaborate with Git and GitHub.",
    level: "Beginner",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "Git", icon: "" }
    ],
    link: "https://example.com/git"
  },
  {
    title: "Vue.js Crash Course",
    description: "Build interactive web interfaces with Vue.js from scratch.",
    level: "Beginner",
    language: "English",
    image: "https://via.placeholder.com/300x180",
    flags: ["flag-icon-us"],
    categories: [
      { title: "Vue", icon: "" },
      { title: "JavaScript", icon: "" }
    ],
    link: "https://example.com/vue"
  }
];

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techboost');
    console.log('✅ Đã kết nối MongoDB');

    const admins = await User.find({ role: 'admin' });
    if (admins.length === 0) throw new Error('Không tìm thấy user admin để gán cho khóa học');

    await Course.deleteMany();

    const newCourses = sampleCourses.map((course) => ({
      ...course,
      createdBy: admins[Math.floor(Math.random() * admins.length)]._id,
      lessons: []
    }));

    const inserted = await Course.insertMany(newCourses);
    console.log(`✅ Đã thêm ${inserted.length} khóa học mẫu`);

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Lỗi khi thêm khóa học:', err.message);
  }
}

seedCourses();
