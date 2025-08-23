import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";

interface OptionType {
  id?: string | number;
  label?: string;
  [key: string]: any;
}

interface SimpleAutoCompleteInputProps {
  data: OptionType[];
  label?: string;
  value: OptionType | null;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: OptionType | null
  ) => void;
  sx?: SxProps<Theme>;
  getOptionLabel?: (option: OptionType) => string;
  [key: string]: any; // for spreading extra props
}

const SimpleAutoCompleteInput: React.FC<SimpleAutoCompleteInputProps> = ({
  data = [],
  label = "Select",
  value,
  onChange,
  sx = {},
  getOptionLabel = (option) => option?.label || "",
  ...props
}) => {
  return (
    <Autocomplete
      disablePortal
      options={data}
      value={value}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, val) => option?.id === val?.id}
      sx={{ width: "100%", ...sx }}
      size="small"
      renderInput={(params) => <TextField {...params} label={label} />}
      {...props}
    />
  );
};

export default SimpleAutoCompleteInput;
