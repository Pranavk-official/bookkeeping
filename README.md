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
    │   ├── errorHandler.js
    │   └── upload.js
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
        └── languageUtils.js
```

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

- **POST** /api/borrow/borrow - Borrow a book
- **PUT** /api/borrow/return/:id - Return a borrowed book
