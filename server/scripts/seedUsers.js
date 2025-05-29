// scripts/seedUsers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const User = require('../models/User');

const sampleUsers = [
  { name: 'Nguyễn Văn A', email: 'a@example.com' },
  { name: 'Trần Thị B', email: 'b@example.com' },
  { name: 'Lê Văn C', email: 'c@example.com' },
  { name: 'Phạm Thị D', email: 'd@example.com' },
  { name: 'Hoàng Văn E', email: 'e@example.com' },
  { name: 'Đỗ Thị F', email: 'f@example.com' },
  { name: 'Vũ Văn G', email: 'g@example.com' },
  { name: 'Bùi Thị H', email: 'h@example.com' },
  { name: 'Đặng Văn I', email: 'i@example.com' },
  { name: 'Ngô Thị J', email: 'j@example.com' },
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techboost');
    console.log('✅ Đã kết nối MongoDB');

    await User.deleteMany({ role: 'user' });

    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user, i) => {
        const hashed = await bcrypt.hash('123456', 10);
        return {
          name: user.name,
          email: user.email,
          password: hashed,
          role: 'user',
        };
      })
    );

    const inserted = await User.insertMany(usersWithHashedPasswords);
    console.log(`Đã thêm ${inserted.length} người dùng mẫu`);

    await mongoose.disconnect();
    console.log('Đã ngắt kết nối MongoDB');
  } catch (err) {
    console.error('Lỗi khi seed user:', err.message);
  }
}

seedUsers();
