import React from 'react';
import '../App.css' // Adjust the path as necessary
import Field from './Field';
import ScrollButton from './ScrollButton';
import { Typography, Button, Box } from '@mui/material';

const Hero = () => {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
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
          {/* Title Section */}
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '4rem' },
              padding: '20px 10px 40px 40px',
              position: 'relative',
              bgcolor: '#05161A',
              borderRadius: '10px',
              border: '2px solid #0f969c',
            }}
          >
        <span className="shadowTitle" style={{ '--duration': '1s', '--delay': '0.5s' }}>Daniel Hed</span>
        <span className="title" style={{ '--duration': '1s', '--delay': '0.5s' }}>utvecklare & designer.</span>
      </Typography>
      <Button
      variant="contained"
      className="custom-btn btn-5" // Apply custom classes for pseudo-elements and hover
      sx={{
        fontFamily: '"Orbitron", sans-serif',
        fontSize: '0.7rem',
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
          bgcolor: 'transparent', // Override MUI hover background color
          boxShadow: 'none', // Override MUI hover box-shadow
          // Note: Color changes and pseudo-element animations are defined in CSS
        }
      }}
      component="a"
      href="/assets/images/CV-english.pdf"
      download
    >
      Download my CV
    </Button>
    <ScrollButton />
    </Box>
    </section>
  );
};

export default Hero;