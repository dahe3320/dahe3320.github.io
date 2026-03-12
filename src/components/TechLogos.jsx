import React from "react";
import { Box, Typography, Tooltip } from '@mui/material';
import ScrollReveal from './ScrollReveal';
import logos from '../data/logos.json';

const TechLogos = () => {
  return (
    <Box sx={{
      py: { xs: 5, md: 8 },
      maxWidth: 1400,
      margin: '0 auto',
      px: { xs: 2, sm: 4, md: 8, lg: 12 },
    }}>
      <ScrollReveal variant="fade-up" duration={900}>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#0f969c',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            mb: 1,
          }}
        >
          Technologies
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: 'center', pb: 6 }}
        >
          Tech Stack
        </Typography>
      </ScrollReveal>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: { xs: 2, md: 3 },
      }}>
        {logos.map((logo, index) => (
          <ScrollReveal
            key={index}
            variant="scale"
            delay={index * 60}
            duration={600}
            threshold={0.05}
          >
            <Tooltip
              title={logo.name}
              placement="top"
              arrow
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'rgba(7, 46, 51, 0.95)',
                    color: '#6da5c0',
                    fontFamily: '"Kode Mono", monospace',
                    fontSize: '0.75rem',
                    border: '1px solid rgba(15, 150, 156, 0.3)',
                    backdropFilter: 'blur(8px)',
                    '& .MuiTooltip-arrow': {
                      color: 'rgba(7, 46, 51, 0.95)',
                    },
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 110, md: 140 },
                  height: { xs: 110, md: 140 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(15, 150, 156, 0.06) 0%, rgba(5, 22, 26, 0.4) 100%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(15, 150, 156, 0.15)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  // Sheen overlay
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                    transition: 'left 0.6s ease',
                    pointerEvents: 'none',
                  },
                  // Bottom glow bar
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '20%',
                    right: '20%',
                    height: '2px',
                    background: 'rgba(15, 150, 156, 0.3)',
                    borderRadius: '2px',
                    transition: 'all 0.4s ease',
                    opacity: 0,
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.1)',
                    borderColor: 'rgba(15, 150, 156, 0.5)',
                    background: 'linear-gradient(135deg, rgba(15, 150, 156, 0.12) 0%, rgba(5, 22, 26, 0.5) 100%)',
                    boxShadow: `
                      0 12px 28px rgba(0, 0, 0, 0.3),
                      0 0 40px rgba(15, 150, 156, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05)
                    `,
                    '&::before': {
                      left: '100%',
                    },
                    '&::after': {
                      opacity: 1,
                      left: '10%',
                      right: '10%',
                    },
                  },
                  '& img': {
                    width: '55%',
                    height: '55%',
                    objectFit: 'contain',
                    filter: 'brightness(0.85) saturate(0.9)',
                    transition: 'all 0.4s ease',
                  },
                  '&:hover img': {
                    filter: 'brightness(1.1) saturate(1.2)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <img src={logo.path} alt={logo.alt} />
              </Box>
            </Tooltip>
          </ScrollReveal>
        ))}
      </Box>
    </Box>
  );
};

export default TechLogos;