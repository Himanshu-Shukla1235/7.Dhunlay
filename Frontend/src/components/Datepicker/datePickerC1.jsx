import React, { useState } from "react";
import dayjs from "dayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00EEFF" }, // Neon blue
    background: { default: "#121212", paper: "#1E1E1E" }, // Dark theme
    text: { primary: "#E0E0E0", secondary: "#B0B0B0" },
  },
});

const CustomDatePicker = ({ value, onChange }) => {
  const [date, setDate] = useState(value || null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onChange) onChange(newDate);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "10px 0",
          }}
        >
          <DatePicker
            label=""
            value={date}
            onChange={handleDateChange}
            format="YYYY-MM-DD" // Ensures correct date format
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
                InputLabelProps: { shrink: true }, // Ensures label doesn't overlap
                sx: {
                  backgroundColor: "#000000", // Dark input background
                  color: "#E0E0E0", // Light text
                  borderRadius: "8px",
                  border: "0.5px solid #00EEFF",
                  input: { color: "#E0E0E0" }, // Input text color
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#00EEFF" },
                    "&:hover fieldset": { borderColor: "#00EEFF" },
                    "&.Mui-focused fieldset": { borderColor: "#00EEFF" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#00EEFF", // Neon label color
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                  "& .MuiSvgIcon-root": { color: "#00EEFF" }, // Calendar icon color
                },
              },
            }}
          />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CustomDatePicker;
