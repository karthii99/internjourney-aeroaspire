import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../api";
import TaskCard from "../components/TaskCard";
import { Container, Typography, Grid } from "@mui/material";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = async (id, done) => {
    try {
      await updateTask(id, { done: !done });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Tasks</Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks found</Typography>
      ) : (
        <Grid container spacing={2}>
          {tasks.map((task) => 
            task && task.title ? (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskCard
                  title={task.title}
                  done={task.done}
                  onToggle={() => handleToggle(task.id, task.done)}
                  onDelete={() => handleDelete(task.id)}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      )}
    </Container>
  );
}
