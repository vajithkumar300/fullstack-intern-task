require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  const email = 'admin@example.com';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hashed = await bcrypt.hash('Admin@123', 10);
  const admin = await User.create({ name: 'Admin', email, password: hashed, role: 'admin' });
  console.log('Admin created:', admin.email);
  process.exit(0);
};

run();
