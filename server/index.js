const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const HOST = "localhost";

app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows) return res.status(404).json({ error: "Not found" });
    res.json(rows);
  });
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) return res.status(404).json("Not found");
  db.run(
    "INSERT INTO todos (title, done) VALUES (?, 0)",
    [title.trim()],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM todos WHERE id=?", [this.lastID], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(rows);
      });
    }
  );
});

app.put("/api/todos/:id/toggle", (req, res) => {
  const id = req.params.id;
  db.get("SELECT done FROM todos WHERE id=?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Not found" });
    const newDone = row.done ? 0 : 1;
    db.run("UPDATE todos SET done=? WHERE id=?", [newDone, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM todos WHERE id=?", [id], (err2, rowUpdate) => {
        if (err2) return res.status(404).json({ error: err.message });
        res.json(rowUpdate);
      });
    });
  });
});

app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const {title} = req.body;
  if (!title || !title.trim()){
    return res.status(400).json({ error: "Title required" });
  }
    db.run("UPDATE todos SET title=? WHERE id=?", [title.trim(), id], (err) => {
      if (err) return res.status(500).json({ "Something`s wrong": err });
       if (this.changes === 0) return res.status(404).json({ error: "Not found" });
      
      db.get("SELECT title FROM todos WHERE id=?", [id], (err, updateTitle) => {
        if (err) return res.status(404).json({ error: err });
        res.json(updateTitle);
      });
    });
  });


app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  db.run("DELETE FROM todos WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.json(404).json("Not found changes");
    res.status(201).end();
  });
});

app.listen(PORT, () => {
  console.log(`Backend on http://${HOST}:${PORT}`);
});
