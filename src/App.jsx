import { useEffect, useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      setError("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
    setError("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="top-section">
          <h1>Task Manager</h1>
          <p>Simple and responsive React task application</p>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="stats">
          <div className="stat-box">
            <h2>{tasks.length}</h2>
            <span>Total Tasks</span>
          </div>

          <div className="stat-box">
            <h2>{tasks.filter((t) => t.completed).length}</h2>
            <span>Completed</span>
          </div>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty">
              <p>No tasks available</p>
            </div>
          ) : (
            tasks.map((item) => (
              <div className="task-item" key={item.id}>
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(item.id)}
                  />

                  <p className={item.completed ? "completed" : ""}>
                    {item.text}
                  </p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
