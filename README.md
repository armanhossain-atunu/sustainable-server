# Sustainable Tech Solution Backend

This is the backend server for the Sustainable Tech Solution project. It provides RESTful APIs for User Management (Registration/Login), Product Management, Messaging, and AI integrations.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for building REST APIs.
- **TypeScript**: Typed superset of JavaScript for better maintainability and error checking.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **Vercel**: For seamless serverless deployment.

---

## API Endpoints Overview

The base URL for all API endpoints is `/api/v1`.

### 1. User Registration (Auth)

Provides endpoints to register new users and manage authentication.

- **POST /api/v1/users/register** (or similar, depending on your route setup)
  - **Description**: Registers a new user in the system.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword123",
      "role": "user"
    }
    ```
  - **Action**: Safely hashes the password using `bcrypt` and stores the user data in the MongoDB `User` collection. Returns a JWT token to keep the user logged in.

### 2. Products Post

Handles operations related to adding and managing sustainable products.

- **POST /api/v1/products**
  - **Description**: Creates a new product posting in the marketplace/platform.
  - **Headers**: Requires `Authorization: Bearer <token>` for authenticated users.
  - **Request Body**:
    ```json
    {
      "title": "Eco-friendly Water Bottle",
      "description": "A reusable water bottle made from recycled materials.",
      "price": 25.0,
      "category": "Accessories",
      "stock": 100
    }
    ```
  - **Action**: Validates the input data and saves a new product record to the `Product` collection. The product can then be fetched by the frontend via `GET /api/v1/products`.

### 3. Messages

Allows users to send messages, inquiries, or contact support.

- **POST /api/v1/messages**
  - **Description**: Submits a new message or inquiry.
  - **Request Body**:
    ```json
    {
      "name": "Jane User",
      "email": "jane@example.com",
      "subject": "Bulk Order Inquiry",
      "message": "I'm interested in ordering 50 units. Are discounts available?"
    }
    ```
  - **Action**: Stores the message data in the `Message` collection. Administrators can later review and respond to these messages.

---

## Local Development

If you want to run this project locally on your machine, follow these steps:

1. **Install Dependencies**
   Run the following command to install all the required Node.js packages:

   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory and define the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   BCRYPT_SALT_ROUNDS=12
   ```

3. **Start the Development Server**
   Run the dev script. It uses `ts-node-dev` for fast reloading during development:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:5000/`.

---

## Vercel Deployment

This project is configured to run flawlessly on Vercel as a Serverless Application.

The application utilizes the `@vercel/node` builder and custom routing defined in `vercel.json`. The Mongoose database connection has been optimized for serverless environments (handling connection caching to prevent connection timeouts like `buffering timed out`).
