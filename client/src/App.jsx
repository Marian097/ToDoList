import React from "react";
import { useState, useEffect } from "react";
import { api } from "./api";
import ApiStatus from "./components/ApiStatus";
import TodoForm from "./components/ToDoForm";
import TodoList from "./components/ToDoList";
import ToDoUpdate from "./components/ToDoUpdate";
import Header from "./components/Header";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const { data } = await api.get("/api/todos");
      setTodos(data);
    } catch (e) {
      setErr(e + "Nu pot incarca lista. Verifica backend-ul");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggle(id) {
    await api.put(`/api/todos/${id}/toggle`);
    load();
  }

  async function remove(id) {
    await api.delete(`/api/todos/${id}`);
    load();
  }

  function handleEdit(todo) {
    setEdit({ id: todo.id, title: todo.title });
  }

  return (
    <div
      style={{ maxWidth: 640, margin: "40px auto", fontFamily: "system-ui" }}
    >
      <Header/>
      <h1>Todo Mini-App</h1>
      <ApiStatus />
      <TodoForm onAdded={load} />

      {loading ? (
        <p>Se încarcă...</p>
      ) : err ? (
        <p style={{ color: "crimson" }}>{err}</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggle}
          onDelete={remove}
          onUpdate={handleEdit}
        />
      )}

      {edit && (
        <ToDoUpdate
          id={edit.id}
          initialTitle={edit.title}
          onSaved={load}
          onClose={() => setEdit(null)}
        />
      )}
    </div>
  );
}
