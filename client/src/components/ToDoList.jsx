import { useState, useEffect } from "react";
import { api } from "../api";

export default function ToDoList({ onToggle, onDelete }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await api.get("/api/todos");
      setTodos(data);
    }
    load();
  }, []);

  if (!todos.length) return <p style={{ opacity: 0.7 }}>Nimic de facut inca</p>;

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              borderBottom: "1px solid black",
              padding: "8px 0",
            }}
          >
            <input
              type="checkbox"
              checked={!!t.done}
              onChange={() => onToggle(t.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: t.done ? "line-through" : "none",
              }}
            >
              {t.title}
            </span>
            <button onClick={() => onDelete(t.id)}>Șterge</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
