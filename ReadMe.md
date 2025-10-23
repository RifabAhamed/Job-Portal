

# Job Portal Application

This is a full-stack job portal application built with a React frontend (using Vite) and a Node.js/Express backend. The entire application is containerized using Docker for easy setup and deployment.

---

## ✨ Features

* **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
* **Job Management:** (Assuming) Functionality for creating, reading, updating, and deleting job postings.
* **File Uploads:** (Assuming) User profile picture or resume uploads handled by Multer and Cloudinary.
* **Email Notifications:** Automated emails for events like registration (using Nodemailer).
* **Containerized:** Fully containerized with Docker and Docker Compose for a consistent development environment.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Axios, Material-UI (MUI) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **File Storage** | Cloudinary, Multer |
| **DevOps** | Docker, Docker Compose |
| **Emailing** | Nodemailer |

---

## 📂 Project Structure

The project uses a monorepo-like structure with separate folders for the frontend and backend.

```

/jobportal-project (root)
├── /backend
│   ├── /src
│   ├── .env            \<-- (You must create this)
│   ├── Dockerfile.dev
│   └── package.json
├── /frontend
│   ├── /src
│   ├── .env            \<-- (You must create this)
│   ├── Dockerfile.dev
│   └── package.json
├── .dockerignore
├── docker-compose.yml
└── README.md

````

---

## 🚀 Getting Started

There are two ways to run this project: using Docker (recommended) or running each service locally.

### 1. Prerequisites

* [Node.js](https://nodejs.org/) (v20.x or later)
* [Docker](https://www.docker.com/products/docker-desktop/) & [Docker Compose](https://docs.docker.com/compose/)
* [Git](https://git-scm.com/)

### 2. Environment Variables

Before you can run the application, you must create two `.env` files.

#### **Backend (`./backend/.env`)**

Create a file named `.env` inside the `backend` folder and add the following variables. **Replace all placeholders** with your actual secrets.

```.env
# Server Port
PORT=5000

# Your MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster_uri/dbname?retryWrites=true&w=majority

# Your secret for signing JWTs
JWT_SECRET=YOUR_VERY_SECURE_RANDOM_STRING

# Google App Password for Nodemailer
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_google_app_password

# Frontend URL (for email links)
BASE_URL=http://localhost:5173

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
````

#### **Frontend (`./frontend/.env`)**

Create a file named `.env` inside the `frontend` folder. This URL points to the backend service *as seen by the browser*.

```.env
# URL for the backend API
VITE_BACKEND_API_URL=http://localhost:5000/v1/platform
```

### 3\. Running the Application (Recommended - Docker)

This is the simplest way to get both services running.

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd jobportal-project
    ```

2.  **Create your `.env` files** as described in Step 2.

3.  **Build and run the containers:**

    ```bash
    docker-compose up --build
    ```

4.  **That's it\!**

      * The **Frontend** will be available at `http://localhost:5173`
      * The **Backend** will be running on `http://localhost:5000`

To stop the application, press `Ctrl + C` in the terminal and then run `docker-compose down`.

### 4\. Running the Application (Local Development)

If you prefer not to use Docker, you can run each service in a separate terminal.

#### **Terminal 1: Start Backend**

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Run the dev server
npm run dev
```

The backend will be running on `http://localhost:5000`.

#### **Terminal 2: Start Frontend**

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Run the dev server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## License

This project is open-source and available under the MIT License.

## Contact

**Maintainer:** Rifab Ahamed

**GitHub:** https://github.com/RifabAhamed

Feel free to open issues for bug reports, feature requests, or any questions.

Thanks for exploring this project. Happy coding! 🎉

*Last updated: 2025-10-23*