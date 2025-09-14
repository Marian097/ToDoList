import React from 'react'
import {useState} from "react"
import {api} from "../api"

export default function ToDoForm() {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    
     async function submit(e){
        e.preventDefault();
        if (!title.trim()) return;
        setLoading(true);
        try {
            await api.post("/api/todos", {title})
            setTitle("");
            //onAdded?.();
        }
        finally {
            setLoading(false)
        }
    }

     return (
    <form action="" onSubmit={submit} style= {{display:"flex", gap: 8}}>
        <input type="text" value = {title} onChange = {(e) => setTitle(e.target.value)} placeholder = "Adauga un text..." style = {{flex: 1, padding: 8}}/>

        <button type="submit" disabled = {loading}>
            {loading ? "Adaug..." : "Adauga"}
        </button>
    </form>
  )
}

 
