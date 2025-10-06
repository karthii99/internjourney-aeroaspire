import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import About from "./pages/About";

export default function App() {
  // --- state ---
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState("light");

  // --- load from localStorage ---
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
    const storedMode = localStorage.getItem("theme");
    if (storedMode) setMode(storedMode);
  }, []);

  // --- save to localStorage ---
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  // --- theme setup ---
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#ff9800" },
        },
      }),
    [mode]
  );

  // --- handlers ---
  const addTask = (task) => setTasks((prev) => [task, ...prev]);
  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar mode={mode} setMode={setMode} />

      <Container sx={{ mt: 4, mb: 6 }}>
        <Routes>
          <Route path="/" element={<Home tasks={tasks} onDelete={deleteTask} />} />
          <Route path="/add" element={<AddTask onAdd={addTask} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
