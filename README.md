# Full-Stack Todo App

A production-ready todo application built with Vanilla JavaScript, Express, PostgreSQL, and deployed on Vercel + Render.

Live Demo: https://todo-app-steel-xi-11.vercel.app/

## Features

- Add, toggle, and delete todos
- Persistent storage with cloud PostgreSQL (Neon)
- Fully deployed architecture:
  - Frontend on Vercel
  - Backend API on Render
- Security-focused setup:
  - Environment variables for secrets
  - Parameterized SQL queries
  - CORS-enabled API
- Responsive UI for mobile and desktop
- Fast local iteration with nodemon

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Frontend  | HTML5, CSS3, Vanilla JavaScript     |
| Backend   | Node.js, Express.js, REST API       |
| Database  | PostgreSQL (Neon Cloud)             |
| Dev Tools | Git, npm, nodemon, dotenv           |
| Hosting   | Vercel (Frontend), Render (Backend) |

## Project Structure

```text
todo-app/
|-- frontend/
|   |-- index.html      # Main UI
|   |-- style.css       # Responsive styling
|   `-- app.js          # Fetch API + DOM logic
|-- backend/
|   `-- src/
|       |-- server.js   # Express routes + middleware
|       `-- db.js       # PostgreSQL connection pool
|-- .env                # Environment variables (not committed)
|-- .gitignore          # Ignores node_modules, .env, logs
|-- package.json        # Scripts + dependencies
`-- README.md           # Project documentation
```

## Local Development Setup

### Prerequisites

- Node.js v18+
- Git
- A Neon PostgreSQL database (or any PostgreSQL instance)

### 1. Clone the repository

```bash
git clone https://github.com/AbdullahIbnYousuf/todo-app.git
cd todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the project root:

```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=verify-full
```

### 4. Run the backend in development mode

```bash
npm run dev
```

Backend runs at: http://localhost:3000

### 5. Run the frontend

Open frontend/index.html in your browser,
or run it via VS Code Live Server.

## API Endpoints

| Method | Endpoint       | Description             | Request Body       | Example Response                            |
| ------ | -------------- | ----------------------- | ------------------ | ------------------------------------------- |
| GET    | /              | API info                | -                  | {"message":"Todo API is running"}           |
| GET    | /health        | Server health check     | -                  | {"status":"ok"}                             |
| GET    | /api/todos     | Fetch all todos         | -                  | [{"id":1,"title":"Task","completed":false}] |
| POST   | /api/todos     | Create new todo         | {"title":"..."}    | Created todo object                         |
| PUT    | /api/todos/:id | Toggle completed status | {"completed":true} | Updated todo object                         |
| DELETE | /api/todos/:id | Delete a todo           | -                  | {"success":true}                            |

## Deployment

### Backend (Render)

- URL: https://todo-app-api-cse8.onrender.com
- Root Directory: todo-app
- Build Command: npm install
- Start Command: npm start
- Environment Variable:
  - DATABASE_URL (set in Render dashboard)

### Frontend (Vercel)

- URL: https://todo-app-steel-xi-11.vercel.app/
- Root Directory: frontend
- Build Command: echo "Static deploy"
- Output Directory: .

## Security Notes

- .env is excluded from version control
- DB credentials are stored in hosting platform environment settings
- SQL uses parameterized queries to reduce injection risk
- CORS is enabled for cross-origin frontend-backend communication

## Troubleshooting

| Issue                | Solution                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| CORS error           | Ensure cors middleware is enabled in backend/src/server.js                  |
| Failed to fetch      | Verify Render backend is awake (free tier can sleep) and API URL is correct |
| DATABASE_URL missing | Confirm .env exists locally or environment variable is set in Render        |
| 404 on API route     | Confirm endpoint path is correct (for example /api/todos)                   |

## Learning Roadmap

Potential next improvements:

- Add user authentication (JWT)
- Rebuild frontend using React/Vue
- Add search, filters, and tags
- Add analytics dashboard (completion trends)
- Add i18n support

## Contributing

1. Fork the repo
2. Create a branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m "Add amazing feature"
4. Push branch: git push origin feature/amazing-feature
5. Open a Pull Request

## License

MIT License.

---

Built with care while learning full-stack development, one step at a time.
