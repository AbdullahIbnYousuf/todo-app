const API_URL = "https://todo-app-api-cse8.onrender.com/api/todos";
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// 1️⃣ Fetch & Render Todos
async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error("Failed to load todos:", err);
    alert("Could not connect to server. Is it running?");
  }
}

function renderTodos(todos) {
  todoList.innerHTML = ""; // Clear current list
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${escapeHtml(todo.title)}</span>
      <div class="actions">
        <button class="toggle-btn" data-id="${todo.id}">${todo.completed ? "↩️" : "✅"}</button>
        <button class="delete-btn" data-id="${todo.id}">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Prevents XSS attacks from user input
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 2️⃣ Add New Todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop page refresh
  const title = todoInput.value.trim();
  if (!title) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    todoInput.value = ""; // Clear input
    fetchTodos(); // Refresh list
  } catch (err) {
    console.error("Failed to add todo:", err);
    alert("Error adding todo");
  }
});

// 3️⃣ Handle Toggle & Delete (Event Delegation)
todoList.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.id;
  if (!id) return;

  try {
    if (btn.classList.contains("toggle-btn")) {
      const isCompleted = btn.closest(".todo-item").classList.contains("completed");
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !isCompleted })
      });
    } else if (btn.classList.contains("delete-btn")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    }
    fetchTodos(); // Refresh after action
  } catch (err) {
    console.error("Action failed:", err);
    alert("Error updating/deleting todo");
  }
});

// 🚀 Initialize
fetchTodos();