# Fitness Class Booking Platform

## Project Overview

The Fitness Class Booking Platform is a full-stack web application that allows users to browse fitness classes, book sessions, manage bookings, make payments, interact with trainers, and receive email notifications with invoices.

The platform provides separate functionalities for users, trainers, and administrators to efficiently manage fitness class scheduling and bookings.

---

## Features

### User Features

* User Registration and Login
* JWT Authentication
* Browse Available Fitness Classes
* Book Fitness Classes
* Cancel Bookings
* Reschedule Bookings
* View Booking History
* Submit Reviews and Ratings
* Receive Email Notifications for bookings, cancellation and rescheduling
* Receive Invoice PDF after Successful Booking

### Trainer Features

* Trainer Profile Management
* Upload Profile Images and Videos
* Manage Availability Slots
* View Assigned Classes
* View Reviews and Ratings
* Respond to Reviews and Ratings


### Admin Features

* Manage Classes
* Manage Trainers
* Monitor Bookings
* View Analytics and Reports

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* JSON Web Token (JWT)

### Email Service

* Brevo Email API

### Media Storage

* Cloudinary

### Deployment

* Frontend: Netlify
* Backend: Render

---

## Live Demo

Frontend:

https://fitness-booking-app.netlify.app/

Backend:

https://fitness-booking-platform-app.onrender.com

---

## Installation and Setup

### Clone Repository

```bash
git clone <repository-url>
cd fitness_booking_platform
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Required Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Configuration

Update the API base URL in:

```text
client/src/api/axios.js
```

Example:

```javascript
const API_URL =
"https://fitness-booking-platform-app.onrender.com/api";
```

---

## Demo Credentials

### Admin Account

Email:
[admin@example.com](mailto:admin@example.com)

Password:
Admin@123

### User Account

Email:
[user@example.com](mailto:user@example.com)

Password:
User@123


---

## Project Structure

```text
fitness_booking_platform
│
├── client
│   ├── public
│   ├── src
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── utils
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── README.md
└── .gitignore
```

---
> Note:
> The `.env` file is required for local development but is not included in the repository for security reasons.
> To get the email confirmation for Bookings, Cancellation and Rescheduling need to register or login with original email id.

## Author

Pratheeksha KA

Fitness Class Booking Platform
