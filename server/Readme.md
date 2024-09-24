# ATS Checker Server

## Project Overview

The ATS Checker is a web application designed to analyze and evaluate resumes against job descriptions using AI and text extraction techniques. It features user authentication, resume uploads, text extraction from various file types, and detailed report generation. The application is built using Node.js with Express.js, with MongoDB as the database.

## Features

- **User Authentication**: Register and log in users with role-based access (Admin/User).
- **File Upload**: Upload resumes in PDF, DOCX, DOC, and TXT formats.
- **Text Extraction**: Extract text from uploaded resumes using libraries like `pdf-parse`, `mammoth`, and `textract`.
- **Resume Analysis**: Analyze resumes and generate detailed reports including readability scores, missing details, and suggestions.
- **Dashboard**: View and manage resume reports in an admin dashboard.

## Technologies Used

- **Front End**: React, CoreUI, React Router
- **Back End**: Node.js, Express.js, Multer, PDF-Parse, Mammoth, Textract
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), bcrypt

## Installation

1. **Clone the Repository**

   git clone <repository-url>
   cd ats-checker

## Install Dependencies

cd server
npm install

## Run the Application

"npm start" or "node server.js"

## Set Up Environment Variables

Create a .env file in the server directory with the following content:

MONGODB_URI=your-mongodb-uri
JWT_SECRET_KEY=your-jwt-secret-key
ADMIN_EMAIL=admin@example.com

## API Endpoints

 - **Authentication**

POST /register: Register a new user.
POST /login: Log in an existing user.

 - **Resume Management**

POST /upload: Upload a resume file for text extraction.
POST /resume-report: Save a resume report.
GET /resume-reports: Retrieve all resume reports.

## Usage

Register and Login

Register a new account or log in with an existing account.
Admin users can manage all resume reports, while regular users have limited access.
Upload and Analyze Resumes

Upload resumes in supported formats (PDF, DOCX, DOC, TXT).
The system will extract text and generate a detailed report.
View Reports

Access the reports via the admin dashboard to view and manage resume evaluations.

## Acknowledgements

 - **Libraries**: pdf-parse, mammoth, textract, bcrypt, jsonwebtoken
 - **Frameworks**: Express.js, MongoDB