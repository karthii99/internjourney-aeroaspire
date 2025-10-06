import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority: priority || "N/A",
    };

    onAdd(newTask);
    setSnackOpen(true);
    setTitle("");
    setDescription("");
    setPriority("");
    setError("");

    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add a Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={!!error}
            helperText={error}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Priority (1-5)"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Add Task
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message="Task added!"
      />
    </Paper>
  );
}
