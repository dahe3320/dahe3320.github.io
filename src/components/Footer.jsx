import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        bottom: 0,
        width: '100%',
        backgroundColor: '#072E33',
        padding: theme.spacing(3),
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        mt: 'auto', // Pushes the footer to the bottom
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} textAlign="center" sx={{ mb: 2 }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} My Portfolio. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="center">
            <Box display="flex" justifyContent="center" gap={2}>
              <IconButton
                href="https://github.com/your-profile"
                target="_blank"
                sx={{ color: '#f0f0f0'}}
                aria-label="GitHub"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                sx={{ color: '#f0f0f0' }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
