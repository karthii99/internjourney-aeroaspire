import React, { useState } from "react";
import { addTask } from "../api";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@mui/material";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Enter a task title");
    try {
      await addTask(title);
      navigate("/"); // back to Home
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit">Add Task</Button>
      </form>
    </Container>
  );
}
