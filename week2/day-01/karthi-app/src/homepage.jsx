import React from "react";
import { Typography, Container } from "@mui/material";

export default function Homepage() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="body1">
        This is a simple homepage built with React and MUI.
      </Typography>
    </Container>
  );
}
