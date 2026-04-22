const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // 👈 NEW: Imports the database connection

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, '..', '..', 'frontend');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Fetch all todos
app.get('/api/todos', (req, res) => {
  try {
    const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

//  Create a new todo
app.post('/api/todos', (req, res) => {
  try {
    const { title } = req.body;
    
    // Basic validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Insert into database
    const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)');
    const result = stmt.run(title);

    // Return the newly created todo
    const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});


// 👈 NEW ROUTE: Toggle todo completion status
app.put('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    // Validate input
    if (completed === undefined) {
      return res.status(400).json({ error: 'Completed field is required' });
    }

    // Update the todo
    const stmt = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
    const result = stmt.run(completed ? 1 : 0, id);

    // Check if anything was actually updated
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Return the updated todo
    const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

//   Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Delete from database
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    const result = stmt.run(id);

    // Check if anything was actually deleted
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Send success confirmation
    res.json({ success: true, message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Keep health check for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});