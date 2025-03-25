import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Box,
} from "@mui/material";

const Selector = ({ options, value = [], onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(typeof value === "string" ? value.split(",") : value); // Ensure value is an array
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ bgcolor: "#1e1e1e", color: "#fff", borderRadius: "8px" }}
    >
      <InputLabel sx={{ color: "#bbb" }}></InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((item) => (
              <Chip
                key={item}
                label={item}
                sx={{ bgcolor: "#333", color: "#fff" }}
              />
            ))}
          </Box>
        )}
        sx={{
          color: "#fff",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
