const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/connectDB');

const courseRoutes = require('./routes/course.routes');
const lessonRoutes = require('./routes/lesson.routes');
const userRoutes = require('./routes/user.routes');
const statisticRoutes = require('./routes/statistic.routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

connectDB();

app.use('/courses', courseRoutes);
app.use('/lessons', lessonRoutes);
app.use('/users', userRoutes);
app.use('/statistics', statisticRoutes);

app.get('/', (req, res) => {
  res.send('TechBoost Server is running');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Không tìm thấy route' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
