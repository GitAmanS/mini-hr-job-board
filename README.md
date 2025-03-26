# Mini HR Job Board

## Tech Stack
- **Frontend:** Next.js
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT-based authentication
- **Database:** MongoDB

## Features
### Users
- Recruiters can manage job postings and view applications.
- Candidates can browse jobs, apply, and track their application status.

### Functionality
#### **Back-End API**
- **Authentication**
  - `POST /auth/register` – Register a new user
  - `POST /auth/login` – Authenticate user and issue JWT
- **Jobs (Recruiter Only)**
  - `POST /jobs` – Create a job posting
  - `GET /jobs` – Retrieve all job listings
  - `PUT /jobs/:id` – Update job details
  - `DELETE /jobs/:id` – Remove a job posting


#### **Front-End Features**
- Login/Register system for recruiters and candidates
- Job Listings (public view)
- Recruiters manage job postings
- Candidates can apply for jobs by uploading resumes

## Security
- Recruiters can manage their own job postings and view applications.
- Candidates can only see job listings and their own application status.

## Installation & Setup
### Backend Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```env
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=mongodb://localhost:27017/minihrboard
   ```
4. Start the backend:
   ```bash
   npm run dev  # Development mode
   npm start    # Production mode
   ```
5. Postman collection is attached in the backend directory for API testing.

### Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## API Testing
- Use Postman to test API endpoints.
- Ensure MongoDB is running locally or provide a remote connection.



