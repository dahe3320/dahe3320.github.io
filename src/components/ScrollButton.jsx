import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { keyframes } from '@mui/system';

// Keyframes for the bounce animation
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0); 
  } 
  40% {
    transform: translateY(-30px); 
  } 
  60% {
    transform: translateY(-10px); 
  } 
`;

const ScrollButton = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 120, sm: 70, lg: 100 },
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        border: { xs: '3px solid #0f969c', sm: '4px solid #0f969c' },
        borderRadius: { xs: '30px', sm: '40px' },
        height: { xs: '70px', sm: '100px' },
        cursor: 'pointer',
      }}
        onClick={handleScroll}
    >
      <IconButton
        sx={{
          color: '#0f969c',
          animation: `${bounce} 2s infinite`,
          mt: { xs: 2.5, sm: 4 },
        }}
      >
        <ExpandCircleDownIcon sx={{ fontSize: { xs: 22, sm: 30 } }} />
      </IconButton>
    </Box>
  );
};

export default ScrollButton;
