## Installation

### Prerequisites

- Node.js
- npm (or yarn)
- MongoDB instance (Cloud or local)

### Clone the Repository

    ```bash
    git clone https://github.com/your-username/ats-checker.git
    ```

### Frontend Setup

**Install Dependencies**

    ```bash
    cd ats-checker/client
    npm install
    ```

**Configure Environment Variables**

    Create a `.env` file in the root directory of client with the following variables:

    ```plaintext
    REACT_APP_GEMINI_API_KEY=your-api-key
    REACT_APP_SERVER=https://your-backend-url.com
    ```

**Start the Application**

    ```bash
    npm start
    ```

### Backend Setup

**Install Dependencies**

    
    ```bash
    cd ats-checker/server
    npm install
    ```

**Configure Environment Variables**

    Create a .env file in the server root directory with the following content:

    ```plaintext
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET_KEY=your-jwt-secret-key
    ADMIN_EMAIL=admin@example.com
    ```

**Start the Application**

    ```bash
    "npm start" or "node server.js"
    ```

## Features

- **User Authentication**: Users can register and log in to access their reports.
- **Resume Upload**: Users can upload resumes in PDF, DOC, DOCX, and TXT formats.
- **Job Description Input**: Users can provide a job description for comparison.
- **Resume Analysis**: Utilizes Google Generative AI to analyze resume content against the job description.

## Technologies Used

- **Frontend**: React, CoreUI, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **AI Integration**: Google Generative AI API
- **File Handling**: Multer, pdf-parse, mammoth, textract

## API Endpoints

 - **Authentication**

    POST /register: Register a new user.
    POST /login: Log in an existing user.

 - **Resume Management**

    POST /upload: Upload a resume file for text extraction.
    POST /resume-report: Save a resume report.
    GET /resume-reports: Retrieve all resume reports.

## Acknowledgements

 - **Libraries**: pdf-parse, mammoth, textract, bcrypt, jsonwebtoken
 - **Frameworks**: Express.js, MongoDB
 - **API**: Google Generative AI

## Set Up Server

	Access Your VPS/Cloud Server:
	Use SSH to connect to your VPS. Hostinger provides SSH access to your server.

    ```bash
    ssh your_username@your_server_ip
    ```

	Update Your Server:
	Update your server’s package list and upgrade existing packages:

    ```bash
    sudo apt update
    sudo apt upgrade
    ```

## Clone Your Application (if using Git):

    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    cd yourrepository
    ```
    If you're using a ZIP file, upload it to your server and unzip it:

    ```bash
    unzip yourapp.zip
    cd yourapp
    ```

## Configure and Start Your Application

	Install Dependencies:

    ```bash
    npm install
    ```

	Start Your Application:

    ```bash
    npm start
    ```
    This starts your server, but it will stop when you disconnect from SSH. To keep it running, use a process manager like PM2:

    ```bash
    npm install -g pm2
    pm2 start server.js --name your-app-name
    pm2 start your-app-name
    pm2 startup
    pm2 save
    pm2 stop app.js
    pm2 restart app.js
    pm2 delete app.js
    pm2 list
    pm2 logs
    ```

## Configure DNS Settings

    Example for api.example.com:

    Record Type: A (Address Record) or CNAME (Canonical Name)
    A Record: Directly points to an IP address.
    CNAME Record: Points to another domain name (useful if the subdomain should point to a domain rather than an IP).
    Name/Host: Enter the subdomain part (e.g., api for api.example.com).
    Value/Points to:
    For A Record: Enter the IP address of your server.
    For CNAME Record: Enter the domain name of your server or hosting service.
    TTL (Time to Live): Set to a default value (e.g., 3600 seconds or 1 hour).
    
    Example Entries:
    
    A Record:
    Name: api
    Type: A
    Value: 123.45.67.89 (Your server's IP address)
    TTL: 3600
    
    CNAME Record:
    Name: api
    Type: CNAME
    Value: yourdomain.com (Or another domain you want to point to)
    TTL: 3600

## Create a Configuration File for Your Subdomain:

    ```bash
    sudo nano /etc/nginx/sites-available/api.example.com
    ```

## Add Configuration for the Subdomain:

    server {
        listen 80;
        server_name api.example.com;
        location / {
            proxy_pass http://35.35.5668.345:4000;  # Your Node.js app or other service
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

## Enable the Configuration:

    ```bash
    sudo ln -s /etc/nginx/sites-available/api.example.com /etc/nginx/sites-enabled/
    ```

## Test the Nginx Configuration:
    ```bash
    sudo nginx -t
    ```

## Restart Nginx:
    ```bash
    sudo systemctl restart nginx
    ```

## Configure Domain and SSL (if applicable)

    Point Your Domain:
    If you have a domain, point it to your server’s IP address via your domain registrar's DNS settings.
    Set Up SSL (Optional but Recommended):
    Use Certbot to obtain an SSL certificate for HTTPS:

    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d your_domain
    ```
