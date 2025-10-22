import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";

export default function App() {
  return (
    <>
      {/* Top navigation bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/add">Add Task</Button>
        </Toolbar>
      </AppBar>

      {/* App routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </>
  );
}
