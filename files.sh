#!/bin/bash


# Create subdirectories
mkdir -p src/{config,controllers,middleware,models,routes,services,utils}


# Create main application files
touch src/app.js
touch src/server.js

# Create configuration files
touch src/config/database.js
touch src/config/firebase.js

# Create model files
touch src/models/book.js
touch src/models/user.js
touch src/models/library.js

# Create controller files
touch src/controllers/bookController.js
touch src/controllers/userController.js
touch src/controllers/libraryController.js
touch src/controllers/borrowController.js

# Create route files
touch src/routes/bookRoutes.js
touch src/routes/userRoutes.js
touch src/routes/libraryRoutes.js
touch src/routes/borrowRoutes.js

# Create middleware files
touch src/middleware/auth.js
touch src/middleware/errorHandler.js

# Create service files
touch src/services/bookService.js
touch src/services/userService.js
touch src/services/libraryService.js
touch src/services/borrowService.js

# Create utility files
touch src/utils/jwtUtils.js
touch src/utils/languageUtils.js


# Create other necessary files
touch .env
npx gitignore node
touch README.md

# Initialize npm and create package.json
npm init -y

# Install dependencies
npm install express mongoose jsonwebtoken bcryptjs multer firebase dotenv morgan

# Install dev dependencies
npm install --save-dev nodemon


echo "Project structure created successfully!"