import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function NavBar({ mode, setMode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            mr: 3,
            fontWeight: 600,
          }}
        >
          My App
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              "&.active": { borderBottom: "2px solid white", borderRadius: 0 },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/add"
            startIcon={<AddIcon />}
            sx={{
              "&.active": { borderBottom: "2px solid white", borderRadius: 0 },
            }}
          >
            Add Task
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/about"
            startIcon={<InfoIcon />}
            sx={{
              "&.active": { borderBottom: "2px solid white", borderRadius: 0 },
            }}
          >
            About
          </Button>
        </Box>

        <IconButton
          color="inherit"
          onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
