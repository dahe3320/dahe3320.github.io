import React from 'react';
import '../App.css'
import Field from './Field';
import ScrollButton from './ScrollButton';
import { Typography, Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

const Hero = () => {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'visible', zIndex: 100 }}>
      <Field />
        <Box
          id="hero"
          className="hero-gradient"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glassmorphism Card */}
          <Box
            sx={{
              position: 'relative',
              padding: { xs: '30px 20px', md: '50px 60px' },
              maxWidth: '1190px',
              margin: '0 20px',
              marginBottom: { xs: '120px', sm: '60px', md: '0' },
              borderRadius: '20px',
              // Glassmorphism layers
              background: 'linear-gradient(135deg, rgba(15, 150, 156, 0.08) 0%, rgba(5, 22, 26, 0.4) 50%, rgba(109, 165, 192, 0.06) 100%)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
              // Multi-layer border for depth
              border: '1px solid rgba(15, 150, 156, 0.2)',
              boxShadow: `
                inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
                inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 80px rgba(15, 150, 156, 0.08)
              `,
              overflow: 'hidden',
              // Glow animation
              animation: 'glassGlow 6s ease-in-out infinite',
              '@keyframes glassGlow': {
                '0%, 100%': {
                  boxShadow: `
                    inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
                    inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    0 0 80px rgba(15, 150, 156, 0.08)
                  `,
                  borderColor: 'rgba(15, 150, 156, 0.2)',
                },
                '50%': {
                  boxShadow: `
                    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
                    inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                    0 8px 48px rgba(0, 0, 0, 0.35),
                    0 0 120px rgba(15, 150, 156, 0.15)
                  `,
                  borderColor: 'rgba(15, 150, 156, 0.35)',
                },
              },
              // Inner highlight edge (top-left light reflection)
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
              // Subtle gradient sheen overlay
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '20px',
                background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.03) 0%, transparent 40%, transparent 60%, rgba(15, 150, 156, 0.03) 100%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                position: 'relative',
                zIndex: 1,
                fontSize: { md: '1.8rem', lg: '2rem' },
                color: '#0f969c',
                marginBottom: 2,
                fontWeight: 400,
              }}
            >
              <span className="introTitle" style={{ '--duration': '0.5s', '--delay': '0.2s' }}>
                Welcome to the portfolio of
              </span>
            </Typography>

            <Typography
              variant="h1"
              sx={{
                position: 'relative',
                zIndex: 1,
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 700,
                marginBottom: 1,
                textAlign: 'center',
                pl: { xs: 1, md: 0 },
              }}
            >
              <span className="shadowTitle">Daniel Hed</span>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                position: 'relative',
                zIndex: 1,
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                color: '#6da5c0',
                fontWeight: 300,
                marginBottom: 3,
              }}
            >
              <span className="title" style={{ '--duration': '0.8s', '--delay': '0.8s' }}>
                Full-stack Developer
              </span>
            </Typography>

            {/* Social Icons and CV Button */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                opacity: 0,
                animation: 'fadeInUp 1s 3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                '@keyframes fadeInUp': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <IconButton
                component="a"
                href="https://github.com/dahe3320"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{
                  color: '#6da5c0',
                  border: '1px solid rgba(15, 150, 156, 0.4)',
                  padding: '12px',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(15, 150, 156, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#2dba4e',
                    borderColor: '#2dba4e',
                    background: 'rgba(45, 186, 78, 0.1)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 20px rgba(45, 186, 78, 0.3)',
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 28 }} />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.linkedin.com/in/daniel-hed-232536263/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{
                  color: '#6da5c0',
                  border: '1px solid rgba(15, 150, 156, 0.4)',
                  padding: '12px',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(15, 150, 156, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#0a66c2',
                    borderColor: '#0a66c2',
                    background: 'rgba(10, 102, 194, 0.1)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 20px rgba(10, 102, 194, 0.3)',
                  },
                }}
              >
                <LinkedInIcon sx={{ fontSize: 28 }} />
              </IconButton>

              <IconButton
                component="a"
                href="mailto:danielhed33@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mail"
                sx={{
                  color: '#6da5c0',
                  border: '1px solid rgba(15, 150, 156, 0.4)',
                  padding: '12px',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(15, 150, 156, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#fa76e2',
                    borderColor: '#fa76e2',
                    background: 'rgba(250, 118, 226, 0.1)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 20px rgba(250, 118, 226, 0.3)',
                  },
                }}
              >
                <MailIcon sx={{ fontSize: 28 }} />
              </IconButton>

              <Button
                variant="contained"
                className="custom-btn btn-5"
                sx={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: '1rem',
                  color: '#404040',
                  fontWeight: 'bolder',
                  background: 'transparent',
                  margin: '20px 0',
                  cursor: 'pointer',
                  boxShadow: `inset 2px 2px 2px 0px rgba(255,255,255,.5),
                              7px 7px 20px 0px rgba(0,0,0,.1),
                              4px 4px 5px 0px rgba(0,0,0,.1)`,
                  outline: 'none',
                  '&:hover': {
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                  },
                }}
                component="a"
                href="/assets/images/CV-english_danhed1.pdf"
                download
              >
                Download my CV
              </Button>
            </Box>
          </Box>
          
          <ScrollButton />
        </Box>
    </section>
  );
};

export default Hero;