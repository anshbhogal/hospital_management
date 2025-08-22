# Hospital Management System (HMS) still undergoing

## Project Overview
This project implements a comprehensive Hospital Management System (HMS) designed to streamline various administrative and operational tasks within a hospital environment. The system provides functionalities for user authentication, patient management, doctor management, appointment scheduling, medical record keeping, and billing. It is built with a robust and modern tech stack, ensuring scalability, maintainability, and a user-friendly experience for different types of users (Admins, Doctors, and Patients).

The primary goal of this HMS is to automate and centralize hospital operations, improving efficiency, reducing manual errors, and enhancing the overall management of patient care and administrative processes.

## Features
The Hospital Management System includes the following key features:

*   **User Authentication & Authorization**: Secure registration and login for different user roles (Admin, Doctor, Patient) using JWT (JSON Web Tokens).
*   **Role-Based Access Control (RBAC)**: Ensures users can only access features and data relevant to their assigned roles, with dynamic sidebar visibility and protected routes.
*   **Patient Management**: CRUD (Create, Read, Update, Delete) operations for patient records, accessible by authorized personnel.
*   **Doctor Management**: CRUD operations for doctor profiles, including specialization and contact details, primarily managed by administrators.
*   **Appointment Scheduling**: Creation, viewing, updating, and cancellation of appointments for patients with doctors.
*   **Medical Records Management**: Digital storage and management of patient medical histories, diagnoses, prescriptions, and lab results.
*   **Billing & Payments**: Management of patient bills, tracking total amounts, payment statuses, and insurance claims, including a real-time revenue dashboard for administrators.
*   **Dashboard Views**: Role-specific dashboards providing quick overviews and access to relevant information for Admins, Doctors, and Patients, now with dynamic content and interactive navigation buttons.
*   **Responsive User Interface**: A modern and intuitive web interface built with React.js, styled with Tailwind CSS, and utilizing Shadcn UI components.

## Tech Stack
The project leverages a full-stack architecture with Python for the backend and TypeScript/React for the frontend.

### Backend
*   **Language**: Python 3.x
*   **Web Framework**: Flask
*   **Database**: MySQL
*   **ORM**: Flask-SQLAlchemy
*   **Database Migrations**: Flask-Migrate
*   **Authentication**: Flask-JWT-Extended (for JWT generation and verification)
*   **MySQL Connector**: PyMySQL
*   **Web Server Gateway Interface (WSGI)**: Gunicorn
*   **Environment Variables**: python-dotenv
*   **API Testing**: `requests` library

### Frontend
*   **Language**: TypeScript
*   **Framework**: React.js
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **UI Components**: Shadcn UI
*   **Data Fetching & State Management**: `@tanstack/react-query`
*   **HTTP Client**: Axios
*   **Routing**: React Router DOM

## Project Structure
The project is organized into two main directories: `hospital` (for the Flask backend) and `frontend` (for the React application).

```
hospital_management/
├── hospital/
│   ├── __init__.py         # Flask app creation and blueprint registration
│   ├── extensions.py       # Flask extensions initialization (db, migrate, jwt)
│   ├── models/             # Database models (SQLAlchemy)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── role.py
│   │   ├── patient.py
│   │   ├── doctor.py
│   │   ├── appointment.py
│   │   ├── medical_record.py
│   │   └── billing.py
│   ├── routes/             # API blueprints and endpoints
│   │   ├── __init__.py
│   │   ├── auth_routes.py
│   │   ├── patient_routes.py
│   │   ├── doctor_routes.py
│   │   ├── appointment_routes.py
│   │   ├── medical_record_routes.py
│   │   └── billing_routes.py
│   └── services/           # Business logic and database interactions
│       ├── auth_service.py
│       ├── patient_service.py
│       ├── doctor_service.py
│       ├── appointment_service.py
│       ├── medical_record_service.py
│       └── billing_service.py
├── tests/
│   └── test_auth.py        # Python script for backend API testing
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # Frontend API service functions (Axios)
│   │   │   ├── index.ts
│   │   │   ├── auth.ts
│   │   │   ├── patients.ts
│   │   │   ├── doctors.ts
│   │   │   ├── appointments.ts
│   │   │   ├── medical_records.ts
│   │   │   └── billing.ts
│   │   ├── components/     # Reusable React components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── forms/      # Reusable form components (e.g., PatientForm)
│   │   │   ├── PrivateRoute.tsx # Component for protected routes
│   │   │   ├── DashboardAppointmentsSummary.tsx # Renamed old AppointmentsTable
│   │   │   ├── AppointmentsTable.tsx  # New table for AppointmentsPage
│   │   │   ├── PatientsTable.tsx
│   │   │   ├── DoctorsTable.tsx
│   │   │   ├── MedicalRecordsTable.tsx
│   │   │   └── BillingTable.tsx
│   │   ├── context/        # React Context API for global state (e.g., AuthContext)
│   │   │   └── AuthContext.tsx
│   │   ├── pages/          # Application pages/views
│   │   │   ├── HomePage.tsx          # Public landing page
│   │   │   ├── Index.tsx           # Admin/Doctor Dashboard
│   │   │   ├── PatientPortal.tsx   # Patient-specific Dashboard
│   │   │   ├── Login.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── PatientsPage.tsx
│   │   │   ├── DoctorsPage.tsx
│   │   │   ├── AppointmentsPage.tsx
│   │   │   ├── MedicalRecordsPage.tsx
│   │   │   ├── BillingPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── App.tsx           # Main React application, routing, context providers
│   │   ├── main.tsx          # React entry point
│   │   └── globals.css       # Tailwind CSS base styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── .env                    # Environment variables for backend
├── Procfile                # Gunicorn configuration for Render deployment
├── requirements.txt        # Python dependencies
├── app.py                  # Flask application entry point
├── config.py               # Flask configuration
└── README.md               # This file
```

## Database Schema (MySQL)
The MySQL database `hospital_management` is structured with the following key tables and relationships:

*   **`roles`**: Stores user roles (e.g., 'Admin', 'Doctor', 'Patient').
    *   `role_id` (PK)
    *   `name`
*   **`users`**: Central table for all system users, linked to roles.
    *   `user_id` (PK)
    *   `role_id` (FK to `roles.role_id`)
    *   `name`
    *   `email` (Unique)
    *   `password_hash`
    *   `phone`
    *   `created_at`
*   **`patients`**: Stores patient-specific information, linked to a user.
    *   `patient_id` (PK)
    *   `user_id` (FK to `users.user_id`, One-to-One)
    *   `date_of_birth`
    *   `address`
*   **`doctors`**: Stores doctor-specific information, linked to a user.
    *   `doctor_id` (PK)
    *   `user_id` (FK to `users.user_id`, One-to-One)
    *   `specialization`
*   **`appointments`**: Manages scheduled appointments between patients and doctors.
    *   `appointment_id` (PK)
    *   `patient_id` (FK to `patients.patient_id`)
    *   `doctor_id` (FK to `doctors.doctor_id`)
    *   `appointment_date`
    *   `status` (e.g., 'Scheduled', 'Completed', 'Cancelled')
    *   `notes`
*   **`medical_records`**: Stores patient medical history.
    *   `record_id` (PK)
    *   `patient_id` (FK to `patients.patient_id`)
    *   `doctor_id` (FK to `doctors.doctor_id`)
    *   `record_date`
    *   `diagnosis`
    *   `prescription`
    *   `lab_results`
*   **`billing`**: Handles patient billing and payment status.
    *   `bill_id` (PK)
    *   `appointment_id` (FK to `appointments.appointment_id`, One-to-One)
    *   `patient_id` (FK to `patients.patient_id`)
    *   `total_amount`
    *   `payment_status` (e.g., 'Paid', 'Pending', 'Overdue')
    *   `insurance_claim` (Boolean)

## Backend Development (Flask)
The backend is built with Flask, providing a RESTful API for the frontend to interact with.

### Setup and Dependencies
The Python dependencies are managed via `requirements.txt`. Key libraries include Flask for the web framework, Flask-SQLAlchemy for ORM, Flask-Migrate for database migrations, and Flask-JWT-Extended for JWT authentication.

### Core Components
*   **`app.py`**: The main Flask application instance, responsible for initializing extensions and registering API blueprints. It now explicitly imports all core models (`User`, `Role`) to ensure proper SQLAlchemy mapper registration.
*   **`config.py`**: Centralized configuration for the Flask app, including database URI, JWT secret keys, and token expiration times. Environment variables are used for sensitive information.
*   **`hospital/extensions.py`**: Initializes Flask extensions globally to prevent circular imports and ensure consistent access across the application.
*   **`hospital/models/`**: Defines the database schema using SQLAlchemy ORM models. Each model file (`user.py`, `patient.py`, etc.) corresponds to a database table and its relationships. Methods for password hashing and verification are included in the `User` model. Importantly, bidirectional relationships (e.g., between `User` and `Role`) now use `back_populates` correctly to avoid SQLAlchemy initialization errors.
*   **`hospital/services/`**: Contains the business logic layer. Service classes (e.g., `AuthService`, `PatientService`) encapsulate operations like user registration, login, and CRUD operations for each entity, interacting directly with the SQLAlchemy models. This adheres to a service-repository pattern, separating concerns from routing. The `AuthService.login_user` now returns comprehensive `user_info` including the user's role.
*   **`hospital/routes/`**: Defines Flask Blueprints and API endpoints for each module. These routes parse incoming requests, call the appropriate service methods, and return JSON responses. JWT authentication decorators (`@jwt_required()`) are extensively used to protect sensitive endpoints, ensuring only authenticated and authorized users can access them. The `/auth/login` endpoint now correctly returns `user_info`. New endpoints like `/billing/summary` have been added to provide aggregated data.

### Authentication
JWT (JSON Web Tokens) are used for secure authentication. Upon successful login, the backend issues an access token and a refresh token, along with detailed `user_info` (including the user's role). The access token is then sent with subsequent requests in the `Authorization` header to authenticate the user and verify their identity and roles.

### Database Migrations
Flask-Migrate is used to manage database schema changes. This allows for version control of the database, making it easy to apply and revert schema updates as the application evolves. Commands like `flask db init`, `flask db migrate`, and `flask db upgrade` are used for this purpose. For Render deployment, `flask db upgrade` is integrated into the "Start Command" to ensure tables are created/updated on deployment.

### API Testing
A dedicated Python script (`tests/test_auth.py`) was created using the `requests` library to test the authentication API endpoints (registration and login). This script demonstrates how to interact with the Flask backend programmatically and verify responses.

## Frontend Development (React.js)
The frontend is a modern Single Page Application (SPA) built with React.js, focusing on a responsive and intuitive user experience.

### Setup and Dependencies
The frontend is built using Vite, a fast build tool for modern web projects. Node.js and npm are used for dependency management. Key UI/styling libraries include Tailwind CSS for utility-first styling and Shadcn UI for accessible and customizable React components. Data fetching and state management are handled by `@tanstack/react-query`, and Axios is used as the HTTP client.

### Core Components and Libraries
*   **`frontend/src/App.tsx`**: The main entry point for the React application. It's configured with `BrowserRouter`, `QueryClientProvider` for React Query, and the custom `AuthProvider` for global authentication state. It now implements sophisticated routing: `HomePage.tsx` for unauthenticated users at the root, and role-based redirection to specific dashboards (e.g., `/admin`, `/patient`) upon successful login.
*   **`frontend/src/context/AuthContext.tsx`**: Implements a React Context to provide global authentication state (user information, JWT tokens) to all components. It includes functions for `login`, `register`, and `logout`. Crucially, it now stores and retrieves full `user_info` (including the role) from `localStorage` to ensure session persistence across page loads and refreshes.
*   **`frontend/src/api/`**: Contains modular API service functions (e.g., `patients.ts`, `doctors.ts`, `appointments.ts`, `medical_records.ts`, `billing.ts`). These files use a centralized `apiClient` (Axios instance with request interceptors for attaching JWT tokens) to make authenticated calls. `frontend/src/api/billing.ts` now includes a `getBillingSummary` function.
*   **`frontend/src/pages/`**: Houses the main views of the application, such as:
    *   `HomePage.tsx`: A new public landing page displaying general hospital details and facilities for unauthenticated users.
    *   `Login.tsx`: The login page, now featuring a refactored `useEffect` hook to ensure reliable role-based redirection after successful authentication.
    *   `Index.tsx` (Admin/Doctor Dashboard): Updated to fetch and display real revenue data from the backend.
    *   `PatientPortal.tsx` (Patient Dashboard), and placeholder pages for `PatientsPage.tsx`, `DoctorsPage.tsx`, `AppointmentsPage.tsx`, `MedicalRecordsPage.tsx`, `BillingPage.tsx`, and `SettingsPage.tsx`.
*   **`frontend/src/components/`**: Contains reusable UI components, including:
    *   **`PrivateRoute.tsx`**: A new component used to secure routes, checking authentication status and `allowedRoles` before rendering child components.
    *   **`Sidebar.tsx`**: The main navigation component, now dynamically rendering links and user info/logout button based on the authenticated user's role and status.
    *   **Dashboard Interactivity**: Buttons in `DashboardAppointmentsSummary.tsx` ("View All") and `QuickActions.tsx` (e.g., "New Patient", "Schedule Appointment") are now functional and navigate to their respective pages.

### Authentication Flow
The frontend authentication flow involves:
1.  **Login**: Users enter credentials on `Login.tsx`, which calls the `loginUser` API.
2.  **Token & User Info Storage**: Upon successful login, `access_token`, `refresh_token`, and detailed `user_info` (including role) received from the backend are stored in `localStorage`.
3.  **AuthContext**: The `AuthContext` now robustly reads these tokens and `user_info` on application load, providing the authentication state (`user`, `token`, `isAuthenticated`, `userRole`) to all components.
4.  **API Interceptor**: The `apiClient` (Axios instance) automatically attaches the `access_token` to the `Authorization` header of every outgoing request.
5.  **Protected Routes**: The `PrivateRoute` component in `App.tsx` and conditional rendering in `App.tsx` itself check if a user is authenticated and has the necessary role(s) before rendering a route or redirecting.

### Role-Based Access Control
The application implements RBAC by associating user roles (Admin, Doctor, Patient, Staff) with specific backend endpoints, frontend routes, and navigation items. The `PrivateRoute` component and the `Sidebar` component dynamically control visibility and access based on the `user.role` stored in the `AuthContext`.

### Modular API Integration
Each core module (Patients, Doctors, Appointments, Medical Records, Billing) has its own dedicated API service file in `frontend/src/api/` (e.g., `patients.ts`). These services export functions for CRUD operations, making the API calls organized and maintainable. These functions are then utilized by `useQuery` and `useMutation` hooks in the respective pages and components to fetch and manipulate data.

## Development Workflow: How it was Built from Scratch
The project was developed iteratively, starting with the backend API, followed by a phased frontend integration, and continuous debugging to ensure full functionality and robust deployment.

1.  **Backend Initialization**:
    *   Flask application structure was set up with `app.py`, `config.py`, and `extensions.py`.
    *   Database models were defined using Flask-SQLAlchemy in `hospital/models/`.
    *   Flask-Migrate was configured and used to initialize and manage database migrations (`flask db init`, `flask db migrate`, `flask db upgrade`). This ensured the database schema could evolve with the application.
    *   Initial `User` and `Role` models were created, along with `AuthService` and `auth_routes` for registration and login functionality.
    *   A Python `requests` script (`tests/test_auth.py`) was implemented for testing backend authentication endpoints.
    *   Subsequent models (Patient, Doctor, Appointment, MedicalRecord, Billing), services, and routes were added module by module.

2.  **Deployment Configuration & Debugging**:
    *   Configured `Procfile` (`web: gunicorn --bind 0.0.0.0:$PORT app:app`) for Render deployment, ensuring the backend listens on the correct port.
    *   Updated `app.py`'s `app.run` to `host="0.0.0.0", port=10000` for local Gunicorn compatibility.
    *   Ensured frontend Axios client (`frontend/src/api/index.ts`) uses `VITE_API_BASE_URL` environment variable for backend API calls.
    *   **Resolved database table missing errors**: Fixed `Table 'roles' doesn't exist` on Render by integrating `flask db upgrade` into the Render "Start Command" (`flask db upgrade && gunicorn ...`), ensuring migrations are applied during deployment.
    *   **Fixed SQLAlchemy relationship errors**: Resolved `ArgumentError` related to back-references by consistently using `back_populates` in both `hospital/models/user.py` and `hospital/models/role.py`, and ensuring explicit model imports in `app.py` to prevent mapper initialization issues.

3.  **Frontend Integration (React.js with Vite, Tailwind, Shadcn UI)**:
    *   **Core Setup**: `AuthContext` was implemented for global authentication state. `App.tsx` was configured with `BrowserRouter` and `PrivateRoute` for robust routing and access control.
    *   **Public Home Page**: Introduced `frontend/src/pages/HomePage.tsx` to serve as the default landing page for unauthenticated users, displaying general hospital information.
    *   **Dynamic Routing**: `App.tsx` was updated to conditionally render `HomePage` for unauthenticated users and redirect authenticated users to their specific dashboards (e.g., `/admin`, `/patient`) based on their roles.
    *   **Login Integration & Persistence**: `Login.tsx` was connected to the backend authentication API (`auth.ts`) using Axios. `AuthContext` was enhanced to store and retrieve `user_info` (with role) from `localStorage`, ensuring login persistence. `Login.tsx` was refactored to use a `useEffect` hook for reliable role-based redirection after successful authentication.
    *   **Dashboard Data Integration**: `Index.tsx` (Admin/Doctor Dashboard) was updated to fetch real revenue data from the backend using `@tanstack/react-query` and display it in `StatsCard`.
    *   **Module-wise CRUD Integration**: Placeholder pages (`PatientsPage.tsx`, `DoctorsPage.tsx`, etc.) were created and integrated into `App.tsx` with `PrivateRoute` and `allowedRoles`. Dedicated API service files were created/reviewed, and `useQuery`/`useMutation` hooks were implemented for data fetching and manipulation.
    *   **UI/UX Improvements**: Enabled navigation for dashboard buttons like "View All" in `DashboardAppointmentsSummary.tsx` and Quick Actions in `QuickActions.tsx`. A global footer was added to all pages via the `Layout` component.
    *   **Refactoring**: `DashboardAppointmentsSummary.tsx` was renamed from `AppointmentsTable.tsx` for clarity.

This iterative approach, combined with systematic problem-solving, led to the current functional and well-structured application, ensuring robust backend-frontend communication, proper authentication, and dynamic content display.

## Getting Started

To set up and run the Hospital Management System on your local machine, follow these steps:

### Prerequisites
*   **Python 3.x**: Ensure Python is installed (e.g., Python 3.9+).
*   **pip**: Python package installer (usually comes with Python).
*   **MySQL Server**: A running MySQL database instance (e.g., XAMPP, Docker, local installation).
*   **Node.js & npm**: Ensure Node.js (LTS version recommended) and npm (Node Package Manager) are installed.
*   **Git**: For cloning the repository.

### Backend Setup

1.  **Navigate to the project root**:
    ```bash
    cd D:\hospital_management
    ```

2.  **Create a Python Virtual Environment**:
    ```bash
    python -m venv venv
    ```

3.  **Activate the Virtual Environment**:
    *   **On Windows (PowerShell)**:
        ```powershell
        . venv/Scripts/Activate.ps1
        ```
    *   **On Windows (Command Prompt)**:
        ```cmd
        venv\Scripts\activate.bat
        ```
    *   **On macOS/Linux**:
        ```bash
        source venv/bin/activate
        ```

4.  **Install Backend Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configure Environment Variables**:
    Create a `.env` file in the `D:\hospital_management` directory (same level as `app.py`) with the following content. **Remember to replace placeholder values with your actual MySQL credentials and strong secret keys.**

    ```
    SECRET_KEY='your_super_secret_flask_key_here'
    JWT_SECRET_KEY='your_super_secret_jwt_key_here'
    DATABASE_URL='mysql+pymysql://your_mysql_user:your_mysql_password@localhost/hospital_management'
    ```
    *   **`your_mysql_user`**: Your MySQL username (e.g., `root`, `hms_user`).
    *   **`your_mysql_password`**: Your MySQL password.
    *   **`hospital_management`**: The name of the database. Ensure this database exists in your MySQL server. If not, create it: `CREATE DATABASE hospital_management;`

6.  **Initialize and Run Database Migrations**:
    These commands set up and update your database schema based on the Flask-SQLAlchemy models.
    ```bash
    flask db init
    flask db migrate -m "Initial migration."
    flask db upgrade
    ```
    *   If you encounter "Access denied" errors, ensure your MySQL server is running, database credentials in `.env` are correct, and the user has appropriate permissions (e.g., `GRANT ALL PRIVILEGES ON hospital_management.* TO 'your_mysql_user'@'localhost' IDENTIFIED BY 'your_mysql_password';`).

### Frontend Setup

1.  **Navigate to the Frontend Directory**:
    ```bash
    cd D:\hospital_management\frontend
    ```

2.  **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables for Frontend**:
    Create a `.env` file in the `D:\hospital_management\frontend` directory (same level as `package.json`) with the following content:

    ```
    VITE_API_BASE_URL=http://127.0.0.1:5000
    ```
    This variable tells the React application where to find your Flask backend API.

### Running the Application

1.  **Start the Backend (in a separate terminal)**:
    Open a *new* terminal, navigate to `D:\hospital_management`, activate your Python virtual environment, and run the Flask app:
    ```bash
    cd D:\hospital_management
    . venv/Scripts/Activate.ps1  # or your respective activation command
    flask run
    ```
    The Flask backend will typically run on `http://127.0.0.1:5000`. Keep this terminal open and running.

2.  **Start the Frontend (in another separate terminal)**:
    Open *another new* terminal, navigate to `D:\hospital_management\frontend`, and start the React development server:
    ```bash
    cd D:\hospital_management\frontend
    npm run dev
    ```
    The React application will typically open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

3.  **Access the Application**:
    Open your web browser and navigate to `http://localhost:5173` to access the Hospital Management System.

## Key Concepts for Deeper Understanding
To fully grasp the architecture and implementation of this project, it is highly recommended to have a good understanding of the following concepts:

*   **RESTful APIs**: Principles of designing networked applications, using standard HTTP methods (GET, POST, PUT, DELETE) for resource manipulation.
*   **JSON Web Tokens (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties. Understand how they are generated, signed, and used for authentication and authorization.
*   **Object-Relational Mapping (ORM)**: How Flask-SQLAlchemy maps Python objects to database tables, allowing you to interact with your database using Python classes instead of raw SQL.
*   **Database Migrations**: The importance of tools like Flask-Migrate for managing database schema changes in a version-controlled manner.
*   **Flask Blueprints**: How Flask blueprints help organize a large application into smaller, reusable modules.
*   **Service-Repository Pattern**: The separation of business logic (services) from data access logic (models/repositories) for better maintainability and testability.
*   **React Component Lifecycle and Hooks**: Understanding `useState`, `useEffect`, `useContext`, and custom hooks for managing component state and side effects.
*   **React Context API**: How it's used for global state management (e.g., authentication state) without prop drilling.
*   **React Router DOM**: Declarative routing for React applications to manage navigation and URL synchronization.
*   **`@tanstack/react-query`**: A powerful library for data fetching, caching, synchronization, and managing server state in React applications. Understand `useQuery` for fetching and `useMutation` for data modifications.
*   **Axios**: A promise-based HTTP client for the browser and Node.js, used for making API requests. Understand request/response interceptors for common tasks like adding auth headers.
*   **Zod**: A TypeScript-first schema declaration and validation library, used with React Hook Form for robust form validation.
*   **React Hook Form**: A library for highly performant, flexible, and extensible forms with easy-to-use validation.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **Shadcn UI**: A collection of re-usable components built using Radix UI and Tailwind CSS, providing accessible and customizable UI primitives.
*   **Role-Based Access Control (RBAC)**: The architectural pattern for restricting system access based on individual user roles.

## Conclusion
This Hospital Management System provides a solid foundation for managing hospital operations. By understanding the technologies used and the development workflow, you can further enhance and expand its capabilities to meet more complex requirements.
