import type { TodoItem } from "../types";

interface Props {
  todo: TodoItem;
  onToggle: (todo: TodoItem) => void;
  onDelete: (id: number) => void;
}

export default function TodoCard({ todo, onToggle, onDelete }: Props) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      marginBottom: 8,
      border: "1px solid #ddd",
      borderRadius: 8,
      opacity: todo.isComplete ? 0.5 : 1,
      transition: "opacity 0.2s"
    }}>
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => onToggle(todo)}
      />
      <span style={{
        flex: 1,
        fontSize: 16,
        textDecoration: todo.isComplete ? "line-through" : "none",
        color: todo.isComplete ? "#999" : "#111"
      }}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
      >
        ✕
      </button>
    </div>
  );
}

