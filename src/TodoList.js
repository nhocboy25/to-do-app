import { useState } from "react";
import "./TodoList.css"; // Import CSS

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [tab, setTab] = useState("all"); 

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const removeAllTasks = () => {
    setTasks([]);
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };


  const filteredTasks = tasks.filter((t) => {
    if (tab === "active") return !t.completed;
    if (tab === "completed") return t.completed;
    return true; 
  });

  return (
    <div className="todo-container">
      <h2>📋 Todo List</h2>
      <div className="tabs">
        <button
          className={tab === "all" ? "active" : ""}
          onClick={() => setTab("all")}
        >
          All
        </button>
        <button
          className={tab === "active" ? "active" : ""}
          onClick={() => setTab("active")}
        >
          Active
        </button>
        <button
          className={tab === "completed" ? "active" : ""}
          onClick={() => setTab("completed")}
        >
          Completed
        </button>
      </div>
      <div className="task-count">
        <span>
          Bạn có {tasks.length} công việc {tasks.length > 0 ? "đang hoạt động": ''}
        </span>
      </div>
      <div className="task-completed">
        <span>
          Bạn đã hoàn thành {tasks.filter(t => t.completed).length} công việc
        </span>
      </div>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Nhập công việc..."
        />
        <button onClick={addTask}>Thêm</button>
      </div>
      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index} className={`task-item ${t.completed ? "completed" : ""}`}>
            <button className="complete-btn" onClick={() => toggleComplete(tasks.indexOf(t))}>✅</button>
            <span>{t.text}</span>
            <button className="delete-btn" onClick={() => removeTask(tasks.indexOf(t))}>❌</button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button className="remove-all-btn" onClick={removeAllTasks}>
          Xóa tất cả
        </button>
      )}
    </div>
  );
}

export default TodoList;