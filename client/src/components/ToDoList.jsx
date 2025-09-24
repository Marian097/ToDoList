export default function ToDoList({ todos, onToggle, onDelete, onUpdate }) {
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
            <button onClick={() => onUpdate(t)}>Modifică</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
