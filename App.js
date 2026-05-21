import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!text) return;

    await axios.post("http://localhost:5000/tasks", { text });

    setText("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <h1>Task Manager</h1>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />

        <button onClick={addTask} style={styles.addBtn}>
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} style={styles.task}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>

          <div>
            <button
              onClick={() => toggleTask(task.id)}
              style={styles.completeBtn}
            >
              ✓
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              style={styles.deleteBtn}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    fontFamily: "Arial",
  },

  inputBox: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
  },

  addBtn: {
    padding: "10px 20px",
    background: "blue",
    color: "white",
    border: "none",
  },

  task: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginTop: "10px",
    border: "1px solid #ddd",
  },

  completeBtn: {
    background: "green",
    color: "white",
    border: "none",
    marginRight: "5px",
    padding: "5px 10px",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
  },
};

export default App;