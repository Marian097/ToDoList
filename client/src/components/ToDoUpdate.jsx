import { useEffect, useState } from "react";
import { api } from "../api";

export default function ToDoUpdate({
  id,
  initialTitle = "",
  onSaved,
  onClose,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  async function handleSave() {
    const value = title.trim();
    if (!value) return;
    setSaving(true);
    try {
      await api.put(`/api/todos/${id}`, { title: value });
      onSaved?.();
      onClose?.();
    } catch (e) {
      alert(e.response?.data?.error || "Nu am putut salva titlul.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="modal"
      tabIndex={-1}
      style={{ display: "block", background: "rgb(93, 182, 181)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifică titlul</h5>
          </div>
          <div className="modal-body">
            <input
              style={{ width: "40%" }}
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={!title.trim() || saving}
            >
              {saving ? "Se salvează..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
