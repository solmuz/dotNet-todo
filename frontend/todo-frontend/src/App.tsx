import { useEffect, useState } from "react";
import { getTodos, createTodo, toggleTodo, deleteTodo } from "./api";
import type { TodoItem } from "./types";

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState("");

  // Fetch all todos on load
  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!input.trim()) return;
    await createTodo(input.trim());
    setInput("");
    fetchTodos();
  };

  const handleToggle = async (todo: TodoItem) => {
    await toggleTodo(todo.id, !todo.isComplete);
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Lista</h1>

      {/* Add new todo */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
          placeholder="Nuevo que hacer..."
          style={{ flex: 1, padding: "8px 12px", fontSize: 16 }}
        />
        <button onClick={handleAdd} style={{ padding: "8px 16px" }}>agregar</button>
      </div>

      {/* Todo list */}
      {todos.map(todo => (
        <div key={todo.id} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px", marginBottom: 8,
          border: "1px solid #ddd", borderRadius: 6,
          opacity: todo.isComplete ? 0.5 : 1
        }}>
          <input
            type="checkbox"
            checked={todo.isComplete}
            onChange={() => handleToggle(todo)}
          />
          <span style={{
            flex: 1, fontSize: 16,
            textDecoration: todo.isComplete ? "line-through" : "none"
          }}>
            {todo.title}
          </span>
          <button onClick={() => handleDelete(todo.id)} style={{ color: "red" }}>✕</button>
        </div>
      ))}

      {todos.length === 0 && <p style={{ color: "#999" }}>Sin nada que hacer.</p>}
    </div>
  );
}
