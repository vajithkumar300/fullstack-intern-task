# Mini SaaS Template Store

**Author:** Ajith Kumar V  
**contact:** vajithkumar300@gmail.com  / 9025318805  
**Role:** Full Stack Web Developer Intern  

---

## Project Description

A **full-stack web app** where users can register, login, browse templates, mark favorites, and view them.  
Admins can **create, edit, and delete templates** via a dashboard. Includes **dark mode** support.  

**Tech Stack:** React.js (Vite) + TailwindCSS, Node.js + Express, MongoDB, JWT Auth, Cloudinary  

---

## Features

- User registration & login with JWT
- Browse and favorite templates
- Admin dashboard: create, edit, delete templates
- Dark mode toggle
- Protected routes & input validation
- Search/filter templates (optional)

---

## Folder Structure

FULLSTACK-INTERN-TASK/
├── client/ # React frontend
├── server/ # Node.js backend
└── README.md

---

## Setup

1. Clone the repo: 

```bash
git clone https://github.com/vajithkumar300/fullstack-intern-task.git
cd FULLSTACK-INTERN-TASK

Install backend:

cd server
npm install
Install frontend:

cd ../client
npm install
Create .env in server/ with:

PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<JWT Secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
COOKIE_SECURE=true
CLOUDINARY_CLOUD_NAME=<Cloudinary Name>
CLOUDINARY_API_KEY=<Cloudinary Key>
CLOUDINARY_API_SECRET=<Cloudinary Secret>
Run
Start backend:

cd server
npm run dev
Start frontend:

cd client
npm run dev
Usage
Register/login

Browse /templates

Favorite templates

View /favorites

Admin dashboard /admin-dashboard (create/edit/delete)

Toggle dark mode

License
MIT

---

If you want, I can make an **even more compact “one-screen” README** for your assessment submission, keeping it **super minimal but professional**.  

Do you want me to do that?
