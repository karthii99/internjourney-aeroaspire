import React from "react";
import { Paper, Typography } from "@mui/material";

export default function About() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">About</Typography>
      <Typography sx={{ mt: 1 }} color="text.secondary">
        This is a simple React Task Manager app.  
        It includes routing, theming, localStorage persistence, and Material-UI for styling.
      </Typography>
    </Paper>
  );
}
