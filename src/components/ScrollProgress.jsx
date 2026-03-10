import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
      setVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Vertical track on right edge */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '4px',
          height: '100vh',
          bgcolor: 'rgba(15, 150, 156, 0.1)',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Fill */}
        <Box
          sx={{
            width: '100%',
            height: `${progress}%`,
            background: 'linear-gradient(180deg, #0f969c, #6da5c0)',
            borderRadius: '0 0 2px 2px',
            transition: 'height 0.05s linear',
            boxShadow: '0 0 8px rgba(15, 150, 156, 0.6)',
          }}
        />
      </Box>

      {/* Circular badge */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 16,
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(20px)',
          transition: 'all 0.4s ease',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* SVG circular progress */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
          >
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="rgba(15, 150, 156, 0.15)"
              strokeWidth="3"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#0f969c"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 18}`}
              strokeDashoffset={`${2 * Math.PI * 18 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
          </svg>
          <Typography
            sx={{
              fontSize: '0.6rem',
              fontWeight: 700,
              color: '#0f969c',
              fontFamily: '"Orbitron", sans-serif',
              zIndex: 1,
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ScrollProgress;