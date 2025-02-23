import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Reusable Loading component
const Loading = ({ size = 40, color = "primary", message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Full-screen overlay
      }}
    >
      <CircularProgress size={size} color={color} />
      <p style={{ marginTop: '10px', color: 'whitesmoke' }}>{message}</p>
    </Box>
  );
};

export default Loading;
