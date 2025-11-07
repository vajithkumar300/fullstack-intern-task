require('dotenv').config();
const connectDB = require('../config/db');
const Template = require('../models/Template');

const seedTemplates = [
  {
    name: "Portfolio Minimal",
    description: "Minimal portfolio template for developers.",
    thumbnail_url: "https://via.placeholder.com/400x250?text=Portfolio+Minimal",
    category: "portfolio"
  },
  {
    name: "E-commerce Starter",
    description: "Basic e-commerce storefront template.",
    thumbnail_url: "https://via.placeholder.com/400x250?text=E-commerce+Starter",
    category: "ecommerce"
  },
  {
    name: "SaaS Landing",
    description: "Landing page for SaaS products.",
    thumbnail_url: "https://via.placeholder.com/400x250?text=SaaS+Landing",
    category: "saas"
  },
  {
    name: "Blog Pro",
    description: "Blog template with articles and tags.",
    thumbnail_url: "https://via.placeholder.com/400x250?text=Blog+Pro",
    category: "blog"
  },
  {
    name: "Admin Dashboard",
    description: "Admin dashboard starter template.",
    thumbnail_url: "https://via.placeholder.com/400x250?text=Admin+Dashboard",
    category: "dashboard"
  }
];

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Template.deleteMany({});
    await Template.insertMany(seedTemplates);
    console.log('Seeded templates');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
};

run();
