import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        mt: 'auto',
        py: 4,
        px: 3,
        overflow: 'hidden',
        // Glassmorphism — matching Hero card
        background: 'linear-gradient(135deg, rgba(15, 150, 156, 0.08) 0%, rgba(5, 22, 26, 0.4) 50%, rgba(109, 165, 192, 0.06) 100%)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        border: 'none',
        borderTop: '1px solid rgba(15, 150, 156, 0.2)',
        boxShadow: `
          inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
          inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
          0 -8px 32px rgba(0, 0, 0, 0.3),
          0 0 80px rgba(15, 150, 156, 0.08)
        `,
        // Top highlight edge
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
          pointerEvents: 'none',
        },
        // Gradient sheen overlay
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.03) 0%, transparent 40%, transparent 60%, rgba(15, 150, 156, 0.03) 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} textAlign="center" sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: '#6da5c0', fontFamily: '"Kode Mono", monospace' }}
            >
              © {new Date().getFullYear()} Daniel Hed. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="center">
            <Box display="flex" justifyContent="center" gap={2}>
              <IconButton
                href="https://github.com/dahe3320"
                target="_blank"
                aria-label="GitHub"
                sx={{
                  color: '#6da5c0',
                  border: '1px solid rgba(15, 150, 156, 0.4)',
                  padding: '10px',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(15, 150, 156, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#2dba4e',
                    borderColor: '#2dba4e',
                    background: 'rgba(45, 186, 78, 0.1)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 0 20px rgba(45, 186, 78, 0.3)',
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/daniel-hed-232536263/"
                target="_blank"
                aria-label="LinkedIn"
                sx={{
                  color: '#6da5c0',
                  border: '1px solid rgba(15, 150, 156, 0.4)',
                  padding: '10px',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(15, 150, 156, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#0a66c2',
                    borderColor: '#0a66c2',
                    background: 'rgba(10, 102, 194, 0.1)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 0 20px rgba(10, 102, 194, 0.3)',
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="mailto:danielhed33@gmail.com"
                aria-label="Email"
                sx={{
                  color: '#6da5c0',
                  border: '1px solid rgba(15, 150, 156, 0.4)',
                  padding: '10px',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(15, 150, 156, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#fa76e2',
                    borderColor: '#fa76e2',
                    background: 'rgba(250, 118, 226, 0.1)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 0 20px rgba(250, 118, 226, 0.3)',
                  },
                }}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
