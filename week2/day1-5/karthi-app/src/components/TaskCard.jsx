import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskCard({ title = "Untitled", done = false, onToggle, onDelete }) {
  return (
    <Card
      onClick={onToggle}
      sx={{
        mb: 2,
        cursor: "pointer",
        backgroundColor: done ? "#e0ffe0" : "#fff",
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ textDecoration: done ? "line-through" : "none" }}>
          {title}
        </Typography>
        <IconButton onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
