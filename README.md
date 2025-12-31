# JOB_PORTAL_WEB_APP
A Job Portal web application currently under development. 
The project focuses on building a secure recruiter dashboard, authentication system, and scalable backend architecture. 
Candidate-side features such as job browsing and applications are planned and under active development.<br/>

🚀 Features<br/>

👤 Candidate<br/>

Browse available jobs<br/>
Apply for jobs<br/>
View applied job status<br/>
Secure authentication<br/>

🧑‍💼 Recruiter<br/>

Recruiter login & dashboard<br/>
Create and manage job postings<br/>
View job applications<br/>
Manage candidate applications<br/>

🔐 Authentication & Security<br/>

JWT authentication using httpOnly cookies<br/>
Auto-login with session persistence<br/>
Protected routes for recruiters<br/>
Secure logout<br/>

🛠 Tech Stack<br/>

Frontend<br/>
React.js<br/>
React Router<br/>
Tailwind CSS<br/>
Fetch API<br/>

Backend<br/>

Node.js<br/>
Express.js<br/>
MongoDB<br/>
JWT (Authentication)<br/>
Cookie-based auth<br/>
CORS configured securely<br/>

🔄 Authentication Flow<br/>

User logs in<br/>
Backend creates JWT<br/>
JWT stored in httpOnly cookie<br/>
Cookie sent automatically with requests<br/>
Auto-login handled via /me API<br/>
