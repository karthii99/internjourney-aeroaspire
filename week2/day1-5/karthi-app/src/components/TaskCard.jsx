import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function TaskCard({ task, onDelete }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography color="text.secondary">{task.description}</Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <PriorityHighIcon fontSize="small" />
          <Typography variant="body2">Priority: {task.priority}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <IconButton color="error" onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
