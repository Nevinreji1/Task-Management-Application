const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };

  tasks.push(task);

  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  tasks = tasks.map((task) =>
    task.id == req.params.id
      ? { ...task, completed: !task.completed }
      : task
  );

  res.json({ message: "Task updated" });
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((task) => task.id != req.params.id);

  res.json({ message: "Task deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});