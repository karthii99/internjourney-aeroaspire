import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import TaskCard from "./TaskCard";

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(""); // numeric field
  const [errors, setErrors] = useState({});

  // Dummy fetch effect to simulate loading tasks
  useEffect(() => {
    const dummyTasks = [
      { id: 1, title: "Sample Task 1", description: "This is a sample task", priority: 3 },
      { id: 2, title: "Sample Task 2", description: "Another task description", priority: 2 },
    ];
    setTasks(dummyTasks);
  }, []);

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!title) newErrors.title = "Title is required";
    else if (title.length < 3) newErrors.title = "Title must be at least 3 characters";

    if (!description) newErrors.description = "Description is required";
    else if (description.length < 5) newErrors.description = "Description must be at least 5 characters";

    if (!priority) newErrors.priority = "Priority is required";
    else if (isNaN(priority) || priority < 1 || priority > 5) newErrors.priority = "Priority must be a number between 1-5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      priority,
    };
    setTasks([...tasks, newTask]);

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("");
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add a Task</Typography>

      <Box component="form" onSubmit={handleAddTask} sx={{ mb: 4 }}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Priority (1-5)"
          type="number"
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: 5 }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          error={!!errors.priority}
          helperText={errors.priority}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>Tasks</Typography>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
    </Container>
  );
};

export default Homepage;
