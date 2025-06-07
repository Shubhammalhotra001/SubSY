# SubSY

**SubSY** is a modern, modular, and scalable backend microservice built with **Node.js**, **Express**, and **MongoDB**, designed to streamline subscription and plan management for SaaS platforms. Featuring robust **JWT-based authentication**, intuitive **plan and subscription management**, and a clean, maintainable codebase, SubSY empowers developers to build reliable subscription systems with ease.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green" alt="Node.js 18.x">
  <img src="https://img.shields.io/badge/Express-4.x-blue" alt="Express 4.x">
  <img src="https://img.shields.io/badge/MongoDB-6.x-brightgreen" alt="MongoDB 6.x">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
</p>

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [✅ Prerequisites](#-prerequisites)
- [🧩 Installation](#-installation)
- [📁 Project Structure](#-project-structure)
- [🧑‍💻 Usage](#-usage)
- [🔌 API Endpoints](#-api-endpoints)
- [🐞 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

### 🔐 Authentication
- **User Registration & Login**: Securely register and log in using email and password.
- **JWT-Based Security**: Generate and validate JSON Web Tokens for protected routes.

### 📦 Plan Management
- **Plan Creation**: Easily add and manage subscription plans.
- **Plan Retrieval**: Fetch all available plans with detailed information.

### 📋 Subscription Management
- **Subscribe to Plans**: Enable users to subscribe to available plans.
- **View Subscriptions**: Access a user's active subscriptions.
- **Cancel Subscriptions**: Seamlessly cancel subscriptions with a single request.

### 🧹 Clean Architecture
- **MVC Design**: Organized codebase following Model-View-Controller principles.
- **Modular Structure**: Easily extendable and maintainable project layout.

## 🛠️ Tech Stack

- **Node.js** & **Express.js**: Fast, lightweight backend framework.
- **MongoDB** with **Mongoose**: Flexible NoSQL database with schema validation.
- **JWT**: Secure authentication and authorization.
- **Additional Libraries**:
  - `dotenv`: Environment variable management.
  - `bcryptjs`: Password hashing for secure storage.
  - `express-validator`: Input validation for robust APIs.
- **Optional**: **RabbitMQ** for asynchronous messaging (if enabled).

## ✅ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local instance or MongoDB Atlas URI)
- **REST Client** (e.g., Postman or Insomnia) for testing APIs
- **Optional**: RabbitMQ (if using asynchronous messaging)

## 🧩 Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/subsy.git
   cd subsy
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root and add the following:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/subsy
   JWT_SECRET=your_jwt_secret
   RABBITMQ_URI=amqp://localhost # Optional for RabbitMQ integration
   ```

4. **Start the Server**:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000` (or the port specified in `.env`).

## 📁 Project Structure

```plaintext
SubSY/
├── config/                  # Database and RabbitMQ configuration
│   └── db.js
├── controllers/            # Business logic for API endpoints
│   ├── authController.js
│   ├── planController.js
│   └── subscriptionController.js
├── middleware/             # Authentication middleware
│   └── auth.js
├── models/                 # Mongoose schemas
│   ├── User.js
│   ├── Plan.js
│   └── Subscription.js
├── routes/                 # Express route definitions
│   ├── auth.js
│   ├── plan.js
│   └── subscription.js
├── utils/                  # Helper utilities (e.g., status checkers)
├── rabbitmq/               # Optional RabbitMQ integration
│   └── connection.js
├── .env                    # Environment variables
├── index.js                # Application entry point
├── package.json
└── README.md
```

## 🧑‍💻 Usage

1. **Register a User**:
   Send a POST request to `/api/auth/register` with email and password.

2. **Log In**:
   Send a POST request to `/api/auth/login` to receive a JWT.

3. **Authenticate Requests**:
   Include the JWT in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

4. **Manage Plans**:
   - Fetch plans: GET `/api/plans`
   - Create plans: POST `/api/plans` (admin only)

5. **Manage Subscriptions**:
   - Subscribe: POST `/api/subscriptions`
   - View subscriptions: GET `/api/subscriptions`
   - Cancel subscription: DELETE `/api/subscriptions/:id`

## 🔌 API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/api/auth/register`         | Register a new user                  |
| POST   | `/api/auth/login`           | Log in and receive a JWT             |
| GET    | `/api/plans`                | Retrieve all subscription plans      |
| POST   | `/api/subscriptions`        | Subscribe to a plan                  |
| GET    | `/api/subscriptions`        | View user's subscriptions            |
| DELETE | `/api/subscriptions/:id`    | Cancel a subscription                |

**Note**: Protected routes require the `Authorization: Bearer <token>` header.

## 🐞 Troubleshooting

| Issue                          | Solution                                                                 |
|--------------------------------|--------------------------------------------------------------------------|
| MongoDB connection failed      | Verify `.env` MONGODB_URI and ensure MongoDB is running                   |
| JWT invalid or missing         | Include a valid token in the `Authorization` header                       |
| RabbitMQ not connecting        | Check RABBITMQ_URI in `.env` or disable RabbitMQ integration              |
| Plan not found                 | Seed default plans or verify the `planId` in requests                     |

## 🤝 Contributing

We welcome contributions to SubSY! Follow these steps to contribute:

1. **Fork the Repository**:
   ```bash
   git clone https://github.com/your-username/subsy.git
   ```

2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit Your Changes**:
   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to Your Branch**:
   ```bash
   git push origin feature/your-feature
   ```

5. **Open a Pull Request**:
   Submit a pull request with a clear description of your changes.

## 📄 License

SubSY is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

---

🚀 **SubSY** – Empower your SaaS platform with a robust, scalable subscription system!
