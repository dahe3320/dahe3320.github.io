import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const loadingMessages = [
  'Initializing portfolio...',
  'Loading projects...',
  'Compiling experiences...',
  'Preparing my awesome projects...',
  'Almost there...',
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5;
        const next = Math.min(prev + increment, 100);
        // Update message based on progress
        const newMsgIndex = Math.min(
          Math.floor((next / 100) * loadingMessages.length),
          loadingMessages.length - 1
        );
        setMessageIndex(newMsgIndex);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setExiting(true), 400);
          setTimeout(() => onComplete(), 1200);
        }
        return next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#05161A',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Background grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(15, 150, 156, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 150, 156, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated initials */}
      <Typography
        sx={{
          fontSize: { xs: '4rem', md: '6rem' },
          fontFamily: '"Orbitron", sans-serif !important',
          fontWeight: '700 !important',
          background: 'linear-gradient(135deg, #0f969c, #6da5c0, #0f969c)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradientShift 2s ease-in-out infinite',
          mb: 4,
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      >
        DH
      </Typography>

      {/* Progress bar */}
      <Box
        sx={{
          width: { xs: 300, md: 500 },
          height: 3,
          bgcolor: 'rgba(15, 150, 156, 0.15)',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 3,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #0f969c, #6da5c0)',
            borderRadius: 2,
            transition: 'width 0.3s ease',
            boxShadow: '0 0 12px rgba(15, 150, 156, 0.6)',
          }}
        />
      </Box>

      {/* Loading message */}
      <Typography
        sx={{
          fontSize: '2rem',
          color: '#0c7078',
          fontFamily: '"Kode Mono", monospace',
          minHeight: '1.2em',
          animation: 'blink 1s step-end infinite',
          '&::after': {
            content: '"_"',
            animation: 'blink 1s step-end infinite',
          },
          '@keyframes blink': {
            '50%': { opacity: 0 },
          },
        }}
      >
        {loadingMessages[messageIndex]}
      </Typography>

      {/* Progress percentage */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: 30,
          fontSize: '2.5rem',
          color: '#0f969c',
          fontFamily: '"Orbitron", sans-serif',
        }}
      >
        {Math.round(progress)}%
      </Typography>
    </Box>
  );
};

export default LoadingScreen;