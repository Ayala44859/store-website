<!-- # Store Website: Full-Stack E-commerce Application

Welcome to the Store Website project, a comprehensive full-stack e-commerce application built with React (Vite) for the frontend and Node.js (Express) for the backend. This project allows users to browse products, manage a shopping cart, and includes robust administrative functionalities for product management.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Folder Structure](#folder-structure)
-   [Getting Started (Local Development)](#getting-started-local-development)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Variables (Local)](#environment-variables-local)
    -   [Running the Application](#running-the-application)
-   [Deployment](#deployment)
    -   [Backend (Render)](#backend-render)
    -   [Frontend (Netlify)](#frontend-netlify)
-   [Important CORS Configuration](#important-cors-configuration)

---

## Project Overview

This application serves as a complete online store. The frontend provides an intuitive user interface for product browsing, cart management, and user authentication. The backend handles all business logic, data storage (MongoDB), user authentication (JWT), and communication with external services like Cloudinary for image uploads.

## Features

-   **User Authentication:** Full support for secure user registration (Sign Up) and login (Login) for both regular users and administrators (JWT-based).
-   **Role Management:** The system distinguishes between regular users and administrative users, presenting different functionalities and interfaces based on the role.
-   **Product Management Panel (Admin Only):**
    *   Dedicated administration menu accessible only to administrators.
    *   Adding new products to the system.
    *   Editing details of existing products.
    *   Deleting products.
-   **Product Catalog:** Browse a wide range of products.
-   **Product Details:** View detailed information for each product.
-   **Shopping Cart:** Add, update, and remove items from your shopping cart before placing an order.
-   **Image Uploads:** Seamless handling of product image uploads via Cloudinary integration.

## Technologies Used

### Frontend (Client)

-   **React.js:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool for modern web projects.
-   **Redux Toolkit:** For efficient state management.
-   **React Router DOM:** For client-side routing.
-   **Axios:** For making HTTP requests to the backend.
-   **Material-UI (MUI Icons):** For pre-built UI components and icons.
-   **SCSS (Sass):** For powerful CSS pre-processing.

### Backend (Server)

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
-   **MongoDB:** A NoSQL database for storing application data.
-   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **JSON Web Tokens (JWT):
    ** For secure authentication.
-   **Bcrypt.js:** For password hashing.
-   **CORS:** For handling Cross-Origin Resource Sharing.
-   **Dotenv:** For managing environment variables.
-   **Cloudinary:** For cloud-based image storage and management.

### Deployment & Version Control

-   **Render:** For deploying the Node.js backend.
-   **Netlify:** For deploying the React frontend.
-   **Git:** Distributed version control system.
-   **GitHub:** For hosting the project's codebase.

## Folder Structure

The project uses a monorepo structure, containing both frontend and backend code within a single repository:
חנות פרויקטים React ו-Node/
לקוח/ # אפליקציית Frontend של React (Vite)
│ ├── ציבורי/ # נכסים סטטיים
│ ├── src/ # קוד מקור של React (רכיבים, דפים, שירותי API, פרוסות Redux)
│ ├── .env # משתני סביבה מקומיים (ריק עבור כתובת API בסביבת ייצור)
│ ├── package.json # תלויות וסקריפטים של ממשק הקצה
│ └── ...
שרת/ # יישום צד-שרת Node.js (Express)
│ ├── תצורה/ # חיבור למסד נתונים, תצורת ענן
│ ├── בקרים/ # לוגיקה עסקית עבור נקודות קצה של API
│ ├── תוכנות ביניים/ # אימות, תוכנת ביניים להעלאת תמונות
│ ├── מודל/ # סכמות Mongoose עבור מודלי נתונים
│ ├── נתבים/ # הגדרות נתיב API
│ ├── קובץ סטטי/ # קבצי תמונה סטטיים
│ ├── utils/ # פונקציות תוכנה (למשל, טיפול באסימוני JWT)
│ ├── .env # משתני סביבה מקומיים (למשל, חיבור מסד נתונים, סוד JWT)
│ ├── index.js # נקודת כניסה ראשית לשרת
│ ├── package.json # תלויות וסקריפטים של ה-backend
│ └── ...
└── .gitignore # כללי התעלמות גלובליים של Git עבור המונורפו
## Getting Started (Local Development)

Follow these steps to set up and run the project on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager) or Yarn
-   MongoDB Atlas account (or a local MongoDB instance)
-   Cloudinary account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ayala44859/store-website.git
    cd "project shop React and Node"
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    cd .. # Go back to the root directory
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd client
    npm install
    cd .. # Go back to the root directory
    ```

### Environment Variables (Local)

To run the project locally, you must provide essential environment variables.
**These files should NOT be committed to the Git repository as they contain sensitive information.**

1.  **For the Backend (`server/.env`):**
    Create a file named `.env` inside the `server/` directory and add the following. Replace placeholder values with your actual secrets:
    ```
    PORT=5500
    DATABASE_URL=your_mongodb_connection_string_from_atlas
    JWT_SECRET=your_super_secret_jwt_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
    *   **Important:** Replace placeholder values (e.g., `your_mongodb_connection_string_from_atlas`) with your actual and sensitive details.

2.  **For the Frontend (`client/.env`):**
    Create a file named `.env` inside the `client/` directory. For local development, this file can remain **empty** as the frontend is configured to fallback to `localhost` if `VITE_API_URL` is not defined (which is the case locally).
    *(Note: `VITE_API_URL` is set directly in Netlify for production deployment, not in this local file.)*

### Running the Application

1.  **Start the Backend Server:**
    Open a terminal in the project's root directory and navigate to the `server` directory:
    ```bash
    cd server
    npm start
    ```
    The server should start on `http://localhost:5500`.

2.  **Start the Frontend Application:**
    Open a **new** terminal in the project's root directory and navigate to the `client` directory:
    ```bash
    cd client
    npm run dev
    ```
    The React application should open in your browser, typically at `http://localhost:5173`.

## Deployment

This project is configured for continuous deployment with Render for the backend and Netlify for the frontend.

### Backend (Render)

-   **Service Type:** Web Service
-   **Root Directory:** `server`
-   **Build Command:** `npm install`
-   **Start Command:** `node index.js`
-   **Environment Variables:** All variables from `server/.env` (except `PORT`) must be manually added to Render's environment variables. Render automatically provides its own `PORT` variable.
-   **URL Example:** `https://store-website-xxxx.onrender.com`

### Frontend (Netlify)

-   **Base Directory:** `client`
-   **Build Command:** `npm run build`
-   **Publish Directory:** `dist`
-   **Environment Variables:** Add `VITE_API_URL` as a variable with the full URL of your Render backend.
    -   **Key:** `VITE_API_URL`
    -   **Value:** `https://store-website-06x4.onrender.com`
-   **URL Example:** `https://your-chosen-name.netlify.app` <!-- Corrected line here -->

<!-- ## Important CORS Configuration

After deploying both the frontend and backend, you **must** update the CORS configuration in your backend to allow requests from your Netlify frontend URL.

1.  **Open `server/index.js`** in your local project.
2.  **Locate the CORS middleware:**
    ```javascript
    app.use(cors());
    ```
3.  **Update it to specify your Netlify URL:**
    ```javascript
    app.use(cors({ origin: 'https://shop-online-super-byta.netlify.app' }));
    ```
    *   **Replace `https://shop-online-super-byta.netlify.app` with the actual, final URL of your Netlify site.**
4.  **Save the file.**
5.  **Commit and push this change to GitHub:**
    ```bash
    git add .
    git commit -m "fix: Configure CORS origin for Netlify deployment"
    git push
    ```
    Render will automatically redeploy your backend with the updated CORS rule, allowing your frontend and backend to communicate seamlessly.

---

**Happy building!** --> -->






# Store Website: Full-Stack E-commerce Application

Welcome to the Store Website project, a comprehensive full-stack e-commerce application built with React (Vite) for the frontend and Node.js (Express) for the backend. This project allows users to browse products, manage a shopping cart, and includes robust administrative functionalities for product management.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Folder Structure](#folder-structure)
-   [Getting Started (Local Development)](#getting-started-local-development)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Variables (Local)](#environment-variables-local)
    -   [Running the Application](#running-the-application)
-   [Deployment](#deployment)
    -   [Backend (Render)](#backend-render)
    -   [Frontend (Netlify)](#frontend-netlify)
-   [Important CORS Configuration](#important-cors-configuration)

---

## Project Overview

This application serves as a complete online store. The frontend provides an intuitive user interface for product browsing, cart management, and user authentication. The backend handles all business logic, data storage (MongoDB), user authentication (JWT), and communication with external services like Cloudinary for image uploads.

## Features

-   **User Authentication:** Full support for secure user registration (Sign Up) and login (Login) for both regular users and administrators (JWT-based).
-   **Role Management:** The system distinguishes between regular users and administrative users, presenting different functionalities and interfaces based on the role.
-   **Product Management Panel (Admin Only):**
    *   Dedicated administration menu accessible only to administrators.
    *   Adding new products to the system.
    *   Editing details of existing products.
    *   Deleting products.
-   **Product Catalog:** Browse a wide range of products.
-   **Product Details:** View detailed information for each product.
-   **Shopping Cart:** Add, update, and remove items from your shopping cart before placing an order.
-   **Image Uploads:** Seamless handling of product image uploads via Cloudinary integration.

## Technologies Used

### Frontend (Client)

-   **React.js:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool for modern web projects.
-   **Redux Toolkit:** For efficient state management.
-   **React Router DOM:** For client-side routing.
-   **Axios:** For making HTTP requests to the backend.
-   **Material-UI (MUI Icons):** For pre-built UI components and icons.
-   **SCSS (Sass):** For powerful CSS pre-processing.

### Backend (Server)

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
-   **MongoDB:** A NoSQL database for storing application data.
-   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **JSON Web Tokens (JWT):** For secure authentication.
-   **Bcrypt.js:** For password hashing.
-   **CORS:** For handling Cross-Origin Resource Sharing.
-   **Dotenv:** For managing environment variables.
-   **Cloudinary:** For cloud-based image storage and management.

### Deployment & Version Control

-   **Render:** For deploying the Node.js backend.
-   **Netlify:** For deploying the React frontend.
-   **Git:** Distributed version control system.
-   **GitHub:** For hosting the project's codebase.

## Folder Structure

The project uses a monorepo structure, containing both frontend and backend code within a single repository:

project shop React and Node/
├── client/             # React (Vite) frontend application
│   ├── public/         # Static assets
│   ├── src/            # React source code (components, pages, API services, Redux slices)
│   ├── .env            # Local environment variables (empty for API URL in production)
│   ├── package.json    # Frontend dependencies and scripts
│   └── ...
├── server/             # Node.js (Express) backend application
│   ├── Config/         # Database connection, Cloudinary config
│   ├── Controllers/    # Business logic for API endpoints
│   ├── Middlewares/    # Authentication, image upload middleware
│   ├── Model/          # Mongoose schemas for data models
│   ├── Routers/        # API route definitions
│   ├── staticFile/     # Static image files
│   ├── utils/          # Utility functions (e.g., JWT token handling)
│   ├── .env            # Local environment variables (e.g., DB connection, JWT secret)
│   ├── index.js        # Main server entry point
│   ├── package.json    # Backend dependencies and scripts
│   └── ...
└── .gitignore          # Global Git ignore rules for the monorepo

## Getting Started (Local Development)

Follow these steps to set up and run the project on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager) or Yarn
-   MongoDB Atlas account (or a local MongoDB instance)
-   Cloudinary account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ayala44859/store-website.git
    cd "project shop React and Node"
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    cd .. # Go back to the root directory
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd client
    npm install
    cd .. # Go back to the root directory
    ```

### Environment Variables (Local)

To run the project locally, you must provide essential environment variables.
**These files should NOT be committed to the Git repository as they contain sensitive information.**

1.  **For the Backend (`server/.env`):**
    Create a file named `.env` inside the `server/` directory and add the following. Replace placeholder values with your actual secrets:
    ```
    PORT=5500
    DATABASE_URL=your_mongodb_connection_string_from_atlas
    JWT_SECRET=your_super_secret_jwt_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
    *   **Important:** Replace placeholder values (e.g., `your_mongodb_connection_string_from_atlas`) with your actual and sensitive details.

2.  **For the Frontend (`client/.env`):**
    Create a file named `.env` inside the `client/` directory. For local development, this file can remain **empty** as the frontend is configured to fallback to `localhost` if `VITE_API_URL` is not defined (which is the case locally).
    *(Note: `VITE_API_URL` is set directly in Netlify for production deployment, not in this local file.)*

### Running the Application

1.  **Start the Backend Server:**
    Open a terminal in the project's root directory and navigate to the `server` directory:
    ```bash
    cd server
    npm start
    ```
    The server should start on `http://localhost:5500`.

2.  **Start the Frontend Application:**
    Open a **new** terminal in the project's root directory and navigate to the `client` directory:
    ```bash
    cd client
    npm run dev
    ```
    The React application should open in your browser, typically at `http://localhost:5173`.

## Deployment

This project is configured for continuous deployment with Render for the backend and Netlify for the frontend.

### Backend (Render)

-   **Service Type:** Web Service
-   **Root Directory:** `server`
-   **Build Command:** `npm install`
-   **Start Command:** `node index.js`
-   **Environment Variables:** All variables from `server/.env` (except `PORT`) must be manually added to Render's environment variables. Render automatically provides its own `PORT` variable.
-   **URL Example:** `https://store-website-xxxx.onrender.com`

### Frontend (Netlify)

-   **Base Directory:** `client`
-   **Build Command:** `npm run build`
-   **Publish Directory:** `dist`
-   **Environment Variables:** Add `VITE_API_URL` as a variable with the full URL of your Render backend.
    -   **Key:** `VITE_API_URL`
    -   **Value:** `https://store-website-06x4.onrender.com`
-   **URL Example:** `https://your-chosen-name.netlify.app`

## Important CORS Configuration

After deploying both the frontend and backend, you **must** update the CORS configuration in your backend to allow requests from your Netlify frontend URL.

1.  **Open `server/index.js`** in your local project.
2.  **Locate the CORS middleware:**
    ```javascript
    app.use(cors());
    ```
3.  **Update it to specify your Netlify URL:**
    ```javascript
    app.use(cors({ origin: 'https://shop-online-super-byta.netlify.app' }));
    ```
    *   **Replace `https://shop-online-super-byta.netlify.app` with the actual, final URL of your Netlify site.**
4.  **Save the file.**
5.  **Commit and push this change to GitHub:**
    ```bash
    git add .
    git commit -m "fix: Configure CORS origin for Netlify deployment"
    git push
    ```
    Render will automatically redeploy your backend with the updated CORS rule, allowing your frontend and backend to communicate seamlessly.

---

**Happy building!**
