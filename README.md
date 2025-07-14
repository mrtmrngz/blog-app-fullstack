# Blog App Fullstack

A modern, full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to create, read, update, and delete blog posts, with admin access for managing content. It features a rich text editor for post creation, user authentication, and a responsive design for seamless use across devices.

## Features

- **User Authentication**: Secure signup and login system with JWT role-based authentication.
- **Admin Privileges**: Admins can add, update, and delete blog posts.
- **Rich Text Editor**: Create and edit posts with support for hyperlinks, images, and videos.
- **CRUD Operations**: Full create, read, update, and delete functionality for blog posts.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Image Uploads**: Support for uploading images to enhance blog posts.
- **Search Functionality**: Search posts by title or content (optional, based on implementation).

## Technologies Used

- **Frontend**: React.js, JavaScript, SCSS, Formik, Yup, Redux Toolkit Query
- **Backend**: Node.js, Express.js, Prisma
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Rich Text Editor**: Quill

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16.x or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Git

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mrtmrngz/blog-app-fullstack.git
   cd blog-app-fullstack
   ```

2. **Install Dependencies**:
    - For the backend:
      ```bash
      cd backend
      yarn install
      ```
    - For the frontend:
      ```bash
      cd ../frontend
      yarn install
      ```

3. **Set Up Environment Variables**:
    - Create a `.env` file in the `backend` directory based on the `.env.example` file.
    - Add the following variables:
      ```env
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      PORT=5000
      ```
    - Replace `your_mongodb_connection_string` with your MongoDB URI and `your_jwt_secret_key` with a secure key for JWT.

4. **Run the Application**:
    - Start the backend server:
      ```bash
      cd backend
      npm start
      ```
    - Start the frontend development server:
      ```bash
      cd frontend
      npm start
      ```
    - The frontend will run on `http://localhost:3000`, and the backend will run on `http://localhost:5000` (or the port specified in your `.env` file).

## Usage

1. **Access the Application**:
    - Open `http://localhost:3000` in your browser to view the frontend.
    - Register a new account or log in as an admin to access privileged features.

2. **Admin Features**:
    - Log in with admin credentials to create, edit, or delete blog posts.
    - Use the rich text editor to format posts and add media.

3. **User Features**:
    - Browse and read blog posts.
    - Search for posts by title or content (if implemented).
    - Engage with posts through comments or likes (if implemented).

## Project Structure

```
blog-app-fullstack/
├── backend/                # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   └── server.js           # Entry point for backend
├── frontend/               # React frontend
│   ├── src/                # React components, pages, and assets
│   ├── public/             # Static files
│   └── package.json        # Frontend dependencies
├── .gitignore              # Files ignored by Git
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request with a detailed description of your changes.

Please ensure your code follows the project's coding standards and includes relevant tests.

## Acknowledgements

- Inspired by modern blogging platforms and MERN stack tutorials.
- Thanks to the open-source community for providing excellent tools and libraries.

## Contact

For questions or feedback, reach out to [mrtmrngz](https://github.com/mrtmrngz) or open an issue on the repository.