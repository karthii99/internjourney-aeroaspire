// src/TaskCard.jsx
import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskCard = ({ title, description, priority, onDelete }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Typography variant="subtitle2">Priority: {priority}</Typography>
      {onDelete && (
        <IconButton onClick={onDelete} color="error">
          <DeleteIcon />
        </IconButton>
      )}
    </CardContent>
  </Card>
);

export default TaskCard;
