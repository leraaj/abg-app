import { Chip, ChipProps } from "@mui/material";
import React from "react";

// Define a type for the keys of the status map
type StatusCode = 1 | 2 | 3;

// Define the structure of each status config
interface StatusConfig {
  text: string;
  sx: ChipProps["sx"];
}

// Define the map with stricter typing
const statusMap: Record<StatusCode, StatusConfig> = {
  1: {
    text: "On Process",
    sx: { color: "orange", backgroundColor: "rgb(252, 217, 148)" },
  },
  2: {
    text: "For Review",
    sx: { color: "rgb(120, 60, 169)", backgroundColor: "rgb(205, 193, 255)" },
  },
  3: {
    text: "Completed",
    sx: { color: "green", backgroundColor: "rgb(148, 252, 163)" },
  },
};

// Accepts any status code, including ones not defined in statusMap
export const formatStatus = (value: number) => {
  const status: StatusConfig = statusMap[value as StatusCode] || {
    text: "Pending",
    sx: { color: "gray", backgroundColor: "rgb(236, 232, 232)" },
  };

  return (
    <Chip
      label={status.text}
      color="default"
      size="small"
      sx={{ p: 1, ...status.sx }}
    />
  );
};
