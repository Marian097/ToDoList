import React from 'react'
import {useState, useEffect} from "react";
import {api} from "./api"
import ApiStatus from "./components/ApiStatus";
import TodoForm from "./components/ToDoForm";
import TodoList from "./components/ToDoList";



export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load(){
    setLoading(true);
    setErr("");
    try {
      const {data} =  await api.get("/api/todos")
      setTodos(data)
    }
    catch (e) {
      setErr(e + "Nu pot incarca lista. Verifica backend-ul")
    }

    finally {
      setLoading(false);
    }
  }

  useEffect(() => {load(); }, [])

  async function toggle(id){
    console.log("Am intrat in PUT")
    await api.put(`/api/todos/${id}/toggle`);
    console.log("Am intrat in PUT")
    load()
  }

  async function remove(id){
    await api.delete(`/api/todos/${id}`)
    load()
  }
  return (
    <div style={{ maxWidth: 640, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Todo Mini-App</h1>
      <ApiStatus />
      <TodoForm onAdded={load} />

      {loading ? (
        <p>Se încarcă...</p>
      ) : err ? (
        <p style={{ color: "crimson" }}>{err}</p>
      ) : (
        <TodoList todos={todos} onToggle={toggle} onDelete={remove} />
      )}
    </div>
  )
}
