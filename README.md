# Mini SaaS Template Store

**Author:** Ajith Kumar V  
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

yaml
Copy code

---

## Setup

1. Clone the repo:

```bash
git clone <repo-url>
cd FULLSTACK-INTERN-TASK
Install backend:

bash
Copy code
cd server
npm install
Install frontend:

bash
Copy code
cd ../client
npm install
Create .env in server/ with:

ini
Copy code
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

bash
Copy code
cd server
npm run dev
Start frontend:

bash
Copy code
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

yaml
Copy code

---

If you want, I can make an **even more compact “one-screen” README** for your assessment submission, keeping it **super minimal but professional**.  

Do you want me to do that?
