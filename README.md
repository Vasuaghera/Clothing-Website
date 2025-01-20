# Clothing Website Project [ French Elite ]
 
## Live Demo
- **Frontend**: [View the live site](https://clothing-website-frontend3.onrender.com/)
- **Admin**: [Access the admin panel](https://clothing-website-admin.onrender.com/)
- **Backend**: [Access the backend API](https://clothing-website-backend-4.onrender.com/)

# Forever Admin Panel

This is the admin panel for the Forever application, built using React and Vite. It provides a user-friendly interface for managing products, orders, and user authentication.

## Features

- **Product Management**: Add, list, and remove products.
- **Order Management**: View and update order statuses.
- **User Authentication**: Admin login functionality.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router**: For routing and navigation within the application.
- **React Toastify**: For displaying notifications.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd admin
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root of the admin folder and set the backend URL:

   ```plaintext
   VITE_BACKEND_URL="http://localhost:4000"
   ```

### Running the Application

To start : npm run dev

# Backend for Clothing E-commerce Application

This is the backend for the Clothing E-commerce application, built using Node.js, Express, and MongoDB. It provides RESTful APIs for user authentication, product management, cart functionality, and order processing.

## Features

- **User Authentication**: Register, login, and admin login functionalities.
- **Product Management**: Add, list, and remove products.
- **Cart Management**: Add items to the cart, update cart items, and retrieve cart data.
- **Order Management**: Place orders, verify payments, and manage order statuses.
- **Payment Integration**: Supports Razorpay for payment processing.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB to manage data relationships.
- **Cloudinary**: For image storage and management.
- **JWT**: For secure user authentication.
- **Nodemailer**: For sending emails (e.g., OTP verification).
- **Multer**: For handling file uploads.

## Getting Started

### Prerequisites

- Node.js (version 18.x)
- MongoDB (local or cloud instance)
- A Cloudinary account for image storage
- A Stripe or Razorpay account for payment processing

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend folder and set the following environment variables:

   ```plaintext
   JWT_SECRET="your_jwt_secret"
   ADMIN_EMAIL="your_admin_email"
   ADMIN_PASSWORD="your_admin_password"
   MONGODB_URI="your_mongodb_uri"
   PORT=4000
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"
   CLOUDINARY_NAME="your_cloudinary_name"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   RAZORPAY_KEY_SECRET="your_razorpay_secret_key"
   RAZORPAY_KEY_ID="your_razorpay_key_id"
   MAIL_HOST="your_mail_host"
   MAIL_USER="your_mail_user"
   MAIL_PASS="your_mail_password"
   ```

### Running the Application

To start the server : node server.js

The server will run on `http://localhost:4000`.

### API Endpoints

- **User Routes**: `/api/user`
  - Register: `POST /register`
  - Login: `POST /login`
  - Admin Login: `POST /admin`
  - Verify Email: `POST /verifyemail`

- **Product Routes**: `/api/product`
  - Add Product: `POST /add`
  - Remove Product: `POST /remove`
  - List Products: `GET /list`
  - Get Single Product: `POST /single`

- **Cart Routes**: `/api/cart`
  - Add to Cart: `POST /add`
  - Update Cart: `POST /update`
  - Get User Cart: `POST /get`

- **Order Routes**: `/api/order`
  - Place Order: `POST /place`
  - Place Order with Razorpay: `POST /razorpay`
  - Verify Razorpay Payment: `POST /verifyRazorpay`
  - Get All Orders: `POST /list`
  - Update Order Status: `POST /status`
  - Get User Orders: `POST /userorders`

# French Elite - Frontend

This is the frontend for the French Elite clothing e-commerce application, built using React and Vite. It provides a modern and responsive user interface for browsing products, managing the cart, and processing orders.

## Features

- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Product Browsing**: View and filter products in various categories.
- **User Authentication**: Login and profile management.
- **Cart Management**: Add, update, and remove items from the cart.
- **Order Processing**: Place orders and manage order history.
- **Newsletter Subscription**: Subscribe to receive updates and offers.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: For routing and navigation within the application.
- **Axios**: For making HTTP requests.
- **Framer Motion**: For animations and transitions.
- **AOS (Animate On Scroll)**: For scroll animations.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root of the frontend folder and set the following environment variables:

   ```plaintext
   VITE_BACKEND_URL="http://localhost:4000"
   VITE_RAZORPAY_KEY_ID="-------- Paste Razorpay key Id --------"
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

The production files will be generated in the `dist` folder.

### Linting

To run ESLint and check for code quality, use:

```bash
npm run lint
# or
yarn lint
```

## Folder Structure

- **src/**: Contains the main application code.
  - **components/**: Reusable components used throughout the application.
  - **pages/**: Individual pages of the application.
  - **context/**: Context API for state management.
  - **assets/**: Static assets like images and icons.
  - **theme/**: Theme-related files, including colors.
- **public/**: Static files served directly.
- **.env**: Environment variables for configuration.
- **tailwind.config.js**: Configuration for Tailwind CSS.
- **vite.config.js**: Configuration for Vite.

## Acknowledgments

- Thanks to the contributors and the open-source community for their support and resources.
