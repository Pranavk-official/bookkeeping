# Bookkeeping Service

## Description

This project is a bookkeeping service API that manages books, users (authors and borrowers), and libraries. It provides functionality for user authentication, book management, library management, and book borrowing operations.

## Project Structure

```bash
bookkeeping-service
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── config
    │   ├── database.js
    │   └── firebase.js
    ├── controllers
    │   ├── bookController.js
    │   ├── borrowController.js
    │   ├── libraryController.js
    │   └── userController.js
    ├── middleware
    │   ├── auth.js
    │   └── errorHandler.js
    ├── models
    │   ├── book.js
    │   ├── library.js
    │   └── user.js
    ├── routes
    │   ├── bookRoutes.js
    │   ├── borrowRoutes.js
    │   ├── libraryRoutes.js
    │   └── userRoutes.js
    ├── server.js
    └── utils
        ├── jwtUtils.js
        ├── firebaseUtils.js
        └── languageUtils.js
```

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd bookkeeping-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables) section).

4. Set up MongoDB and Firebase (follow their respective documentation for setup instructions).

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
FIREBASE_API_KEY=<your-firebase-api-key>
FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
FIREBASE_APP_ID=<your-firebase-app-id>
```

Replace `<...>` with your actual values.

## Running the Application

To start the server in development mode:

```
npm run dev
```

To start the server in production mode:

```
npm start
```

The server will start on the port specified in your environment variables (default is 3000).

## API Endpoints

### Users

- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Authenticate user and generate JWT token

### Books

- **GET** `/api/books` - Retrieve a list of all books
- **GET** `/api/books/:id` - Retrieve details of a specific book
- **POST** `/api/books` - Create a new book entry
- **PUT** `/api/books/:id` - Update details of a specific book
- **DELETE** `/api/books/:id` - Delete a book

### Libraries

- **GET** `/api/libraries` - Retrieve a list of all libraries
- **GET** `/api/libraries/:id` - Retrieve details of a specific library
- **POST** `/api/libraries` - Create a new library
- **PUT** `/api/libraries/:id` - Update details of a specific library
- **DELETE** `/api/libraries/:id` - Delete a library

### Borrowing

- **POST** `/api/borrow/borrow` - Borrow a book
- **PUT** `/api/borrow/return/:id` - Return a borrowed book
