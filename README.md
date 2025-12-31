# JOB_PORTAL_WEB_APP
A Job Portal web application currently under development. 
The project focuses on building a secure recruiter dashboard, authentication system, and scalable backend architecture. 
Candidate-side features such as job browsing and applications are planned and under active development.<br/>

🚀 Features

👤 Candidate

Browse available jobs
Apply for jobs
View applied job status
Secure authentication

🧑‍💼 Recruiter

Recruiter login & dashboard
Create and manage job postings
View job applications
Manage candidate applications

🔐 Authentication & Security

JWT authentication using httpOnly cookies
Auto-login with session persistence
Protected routes for recruiters
Secure logout

🛠 Tech Stack

Frontend
React.js
React Router
Tailwind CSS
Fetch API

Backend

Node.js
Express.js
MongoDB
JWT (Authentication)
Cookie-based auth
CORS configured securely

🔄 Authentication Flow

User logs in
Backend creates JWT
JWT stored in httpOnly cookie
Cookie sent automatically with requests
Auto-login handled via /me API
