import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function FeatureUnavailable() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        backgroundColor: 'black',
        textAlign: 'center',
        padding: '2rem',
        borderRadius:"0.5vw"
      }}
    >
      <WarningIcon sx={{ fontSize: '4rem', color: '#FF0000' }} />
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF0000', marginTop: '1rem' }}>
        This Feature is Coming Soon!
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '1rem', color: '#555' }}>
        This feature is currently unavailable as it's part of our beta version. We're working hard to bring it to you.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '1rem', color: '#888' }}>
        Thank you for your patience and understanding!
      </Typography>
      {/* <Button
        variant="contained"
        sx={{ marginTop: '2rem', backgroundColor: '#FF0000' }}
        onClick={() => window.history.back()}
      >
        Go Back
      </Button> */}
    </Box>
  );
}

export default FeatureUnavailable;
