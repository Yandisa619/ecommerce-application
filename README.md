MERN Stack eCommerce Website
This project is a full-stack eCommerce website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The project allows users to explore products, add them to a cart, and place orders. It also includes an admin dashboard for managing products, users, and orders.

Features
User Features
Product Exploration: Users can view products, filter and sort them.

Product Variants: Users can select product variants (e.g., size) before adding them to the cart.

Cart: Users can add products to the cart and manage the quantity.

Checkout: Users can provide a delivery address and choose from two payment methods:

Cash on Delivery

Online Payment using integrated payment gateways (Stripe and Razorpay).

Admin Dashboard
Manage Products: Admin can upload new products, delete existing ones, and view all products.

Order Management: Admin can view and manage all customer orders.

Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Payment Gateways: Stripe, Razorpay

Deployment: Vercel (for frontend) and custom server hosting for backend

Setup and Installation
Frontend Setup
Clone the repository:
git clone <repo-url>

Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Run the development server:
npm start

Backend Setup
Navigate to the backend folder:
cd backend

Install dependencies:
npm install

Set up your environment variables (e.g., MongoDB URI, Stripe and Razorpay credentials).

Start the backend server:
npm run dev

Deployment
Deploy the frontend on Vercel by following the deployment steps on the Vercel documentation.

For the backend, deploy it on your preferred server or use a service like Heroku or AWS.

Conclusion
This project demonstrates how to build a full-fledged eCommerce platform using the MERN stack, with integrated payment gateways for seamless online transactions. The admin dashboard offers a simple and efficient way to manage products and orders.
