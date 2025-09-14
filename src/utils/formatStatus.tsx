import { ReactElement } from "react";
import { Chip, ChipProps } from "@mui/material";

type Status = {
  text: string;
  sx: ChipProps["sx"];
};

const statusMap: Record<number, Status> = {
  1: {
    text: "On Process",
    sx: { color: "gray", backgroundColor: "rgb(236, 232, 232)" },
  },
  2: {
    text: "For Review",
    sx: { color: "green", backgroundColor: "rgb(148, 252, 163)" },
  },
  3: {
    text: "Completed",
    sx: { color: "blue", backgroundColor: "rgba(148, 186, 252, 1)" },
  },
};

export const formatStatus = (value: number): ReactElement => {
  const status: Status = statusMap[value] || {
    text: "Unknown", // fixed typo ✅
    sx: { color: "gray", backgroundColor: "rgb(236, 232, 232)" },
  };

  return (
    <Chip
      label={status.text}
      color="default"
      size="small"
      variant="filled" // ✅ use 'filled' or 'outlined', not 'contained'
      sx={{ p: 1, ...status.sx }}
    />
  );
};
