You are an expert full-stack developer mentoring a complete beginner. Guide me step-by-step to build a complete Todo web app from scratch. We will use:
- Backend: Node.js + Express
- Database: SQLite (via better-sqlite3)
- Frontend: Vanilla HTML, CSS, JavaScript
- API: RESTful with JSON
- Dev Workflow: Local first, then basic deployment concepts

Phase 1: Project Setup & Basic Server
1. Show me the exact terminal commands to create the folder structure:
   /backend
     /src
       server.js
   /frontend
     index.html
     style.css
     app.js
2. Show `package.json` setup commands and install these dependencies: express, cors, better-sqlite3
3. Create `backend/src/server.js` with:
   - Express app setup
   - CORS enabled for localhost
   - JSON body parser
   - Basic route: GET /api/health returning {"status": "ok"}
   - Listen on port 3000



Phase 2: SQLite Database Setup
1. Create `backend/src/db.js` that:
   - Imports better-sqlite3
   - Creates/opens `todos.db` in the project root
   - Enables WAL mode and foreign keys
   - Creates a `todos` table if it doesn't exist with columns:
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT NOT NULL,
     completed INTEGER DEFAULT 0,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   - Exports the database instance
2. Update `server.js` to import and initialize the DB on startup.
3. Explain why we use INTEGER for booleans in SQLite.
4. Show how to verify the table was created (using a quick script or DB browser).
STOP after this phase and ask me to confirm.






Phase 3: REST API Routes (CRUD)
Create `backend/src/routes/todos.js` with Express Router containing:
1. GET / → Returns all todos, ordered by created_at DESC
2. POST / → Accepts { "title": "string" }, validates it, inserts into DB, returns new todo
3. PUT /:id → Toggles completed status for the given id, returns updated todo
4. DELETE /:id → Deletes todo by id, returns { success: true }
5. Add basic validation (e.g., title must be non-empty, return 400 if invalid)
6. Export the router and mount it in `server.js` at `/api/todos`
7. Explain HTTP status codes used and why we use `req.body` vs `req.params`
8. Show how to test each route using curl or Postman.
STOP after this phase and ask me to confirm.




Phase 4: Frontend Structure & JS Logic
1. `frontend/index.html`: Semantic structure with:
   - Header
   - Input field + "Add" button
   - Empty `<ul id="todo-list">`
   - Link to `style.css` and `app.js`
2. `frontend/style.css`: Clean, responsive, modern styling (flexbox, hover states, completed strikethrough)
3. `frontend/app.js`:
   - `fetchTodos()`: GET /api/todos, render list
   - `addTodo()`: POST /api/todos, clear input, refresh list
   - `toggleTodo(id)`: PUT /api/todos/:id, update UI without full refresh
   - `deleteTodo(id)`: DELETE /api/todos/:id, remove from DOM
   - Use async/await, try/catch, and show basic error alerts
   - Attach event listeners properly
4. Explain how `fetch()` maps to our backend routes.
STOP after this phase and ask me to confirm.






Phase 5: Connect Frontend + Backend & Test
1. Show how to serve the frontend during development (either via VS Code Live Server OR add Express static middleware in `server.js` to serve `/frontend` on port 3000)
2. If using static middleware, show the exact code to add to `server.js`
3. Explain CORS in simple terms and confirm our setup handles it
4. Give a step-by-step test checklist:
   - Open browser → add todo → verify in DB/backend
   - Refresh → todos persist
   - Click complete → updates without reload
   - Delete → removes permanently
5. List common beginner bugs here (e.g., CORS errors, fetch not sending JSON headers, DB locked) and how to fix them.
STOP after this phase and ask me to confirm.





Phase 6: Deployment Preparation & Learning Path
1. Explain how to push this to GitHub (exact commands)
2. Show how to prepare for deployment:
   - Replace localhost URLs with environment variables
   - Create `.env` for PORT and DB path
   - Add `scripts` to package.json: "start": "node backend/src/server.js"
3. Give a simple deployment path:
   - Frontend: Vercel (static)
   - Backend + DB: Render or Railway
   - Explain why SQLite needs special handling in production (or how to switch to PostgreSQL later)
4. List 3 next projects that level up your skills (e.g., add user auth, real-time updates with WebSockets, switch to React)
5. Congratulate me and ask what part confused me most or what I want to rebuild differently.
STOP after this phase.