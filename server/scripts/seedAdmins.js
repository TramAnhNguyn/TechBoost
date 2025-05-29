// scripts/seedAdmins.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

const User = require('../models/User');

const admins = [
  'Nguyễn Gia Bảo',
  'Nguyễn Lê Trâm Anh',
  'Nguyễn Huỳnh Thế Bảo',
  'Mai Trần Thanh Bình',
  'Đinh Trần Công Chiến'
];

async function seedAdmins() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techboost', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    await User.deleteMany({ role: 'admin' });

    const hashedAdmins = await Promise.all(
      admins.map(async (name, index) => {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        return {
          name,
          email: `admin${index + 1}@example.com`,
          password: hashedPassword,
          role: 'admin'
        };
      })
    );

    const result = await User.insertMany(hashedAdmins);
    console.log(`✅ Đã thêm ${result.length} admin:`, result.map(a => a.email));

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Lỗi kết nối MongoDB:', err);
  }
}

seedAdmins();