# Task Manager Backend

A robust backend REST API for managing tasks, built with Node.js, Express, TypeORM, TypeScript, and PostgreSQL. This project follows a clean 3-layer architecture (routes, controllers, services) and includes interactive API documentation with Swagger.

## 🚀 Features

- **Task CRUD**: Create, read, update, and delete tasks
- **TypeORM Integration**: PostgreSQL database with entity models
- **Three-layer Architecture**: Separation of routes, controllers, and services
- **Environment-based Configuration**: Easily configurable via `.env`
- **CORS Support**: Configurable origins
- **Swagger Documentation**: Interactive API docs at `/api-docs`

## 📋 Requirements

- Node.js v20.13.*
- npm, yarn, or pnpm
- PostgreSQL database

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PPORT=4000
CORS_OPTIONS=*
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

## 🛠️ Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidquintanajob/Contract-Manager
   cd backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure your environment**
   - Edit `.env` with your database credentials.
4. **Run the server**
   - Development mode (with auto-reload):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## 📚 API Documentation

Interactive Swagger UI is available at:

```
http://localhost:4000/api-docs
```

### Main Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | /api/tasks       | Get all tasks            |
| GET    | /api/tasks/:id   | Get a task by ID         |
| POST   | /api/tasks       | Create a new task        |
| PUT    | /api/tasks/:id   | Update an existing task  |
| DELETE | /api/tasks/:id   | Delete a task            |

#### Example: Create a Task

```http
POST /api/tasks
Content-Type: application/json

{
  "text": "My first task"
}
```

#### Example: Update a Task

```http
PUT /api/tasks/1
Content-Type: application/json

{
  "text": "Updated task text"
}
```

#### Example: Get All Tasks

```http
GET /api/tasks
```

#### Example: Get Task by ID

```http
GET /api/tasks/1
```

#### Example: Delete a Task

```http
DELETE /api/tasks/1
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── app.ts                # Main entry point
│   ├── database/             # Database connection config
│   ├── models/               # TypeORM entities (e.g., Task)
│   ├── controllers/          # Controllers (e.g., TaskController)
│   ├── services/             # Business logic (e.g., TaskService)
│   └── routs/                # Route definitions (e.g., taskRoutes)
├── .env                      # Environment variables
├── package.json              # Project metadata and scripts
└── README.md                 # Project documentation
```

## 🐛 Troubleshooting

- Ensure PostgreSQL is running and credentials are correct.
- If CORS errors occur, check the `CORS_OPTIONS` variable.
- For Swagger errors, visit `/api-docs` after the server is running.
- If tables are not created, check your TypeORM config and entity imports.

