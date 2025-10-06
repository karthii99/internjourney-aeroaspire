// pages/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPriority =
      !filterPriority || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          label="Search by Title"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon color="action" />,
          }}
          fullWidth
        />
        <TextField
          select
          label="Filter by Priority"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {[1, 2, 3, 4, 5].map((p) => (
            <MenuItem key={p} value={String(p)}>
              {p}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {filteredTasks.length === 0 ? (
        <Typography>No matching tasks</Typography>
      ) : (
        filteredTasks.map((task, i) => (
          <Card key={i} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography>{task.description}</Typography>
              <Typography sx={{ mt: 1 }}>Priority: {task.priority}</Typography>
              <IconButton
                color="error"
                onClick={() => deleteTask(i)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
