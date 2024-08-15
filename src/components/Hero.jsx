import React from 'react';
import '../App.css' // Adjust the path as necessary
import dhfoto from '/assets/images/dhfoto.jpg';
import { Grid, Card, Typography, Button, Box } from '@mui/material';

const Hero = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        overflow: 'hidden',
        position: 'relative', // Needed to position the overlays
      }}>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
        <Grid item xs={8} md={4}>
        <Card sx={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          placeContent: 'center',
          height: 700,
          color: '#c5c5c5',
          fontSize: '28px',
          textAlign: 'center',
          backgroundImage: `url(${dhfoto})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          padding: '50px',
          borderRight: '5px double #7B6099',
          borderBottom: '5px double #7B6099',
          borderRadius: '0 0 150px 0',
          overflow: 'hidden',
          "&:hover::before, &:hover::after": { transform: 'translateY(0)' },
          "&:hover .cardBody": { opacity: 1, transitionDelay: '0.75s' },
          "::before, ::after": {
            content: '""',
            position: 'absolute',
            left: 0,
            zIndex: -1,
            width: '100%',
            height: 'calc(60% + 32px)',
            backgroundColor: '#ffffff2d',
            transition: 'transform 0.5s 0.25s',
          },
          "::before": {
            top: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 55%, 0% 100%)',
            transform: 'translateY(-100%)',
          },
          "::after": {
            bottom: 0,
            clipPath: 'polygon(0 45%, 100% 0, 100% 100%, 0% 100%)',
            transform: 'translateY(100%)',
          },
        }}>
          <Box className="cardBody" sx={{
            background: 'linear-gradient(90deg, #292033 0%, #4a3761 100%);',
            padding: '200px 20px 200px 20px',
            borderRadius: '0 0 150px 0',
            opacity: 0,
            transition: 'opacity 0.25s',
          }}>
            <Typography variant="h5" component="div">
              About Me
            </Typography>
            <Typography variant="body1" gutterBottom>
              My name is Daniel Hed, I am 23 years old.<br />
              Born and raised in Stockholm, now residing in Växjö for studies.
            </Typography>
            <Typography variant="body1">
              I am a creative and driven person with a passion for development in the fields of graphic design, 3D modeling, and web development.
            </Typography>
            <Typography variant="body1">
              <br /> Hidden Skills: Economics, sketching, and football.
            </Typography>
          </Box>
        </Card>
        </Grid>
        <Grid item xs={8} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" component="div">
        {/* Using <span> to apply animations */}
        <span className="title" style={{ '--duration': '1s', '--delay': '0.5s' }}>Daniel Hed</span>
        <span className="title" style={{ '--duration': '1s', '--delay': '0.8s' }}>developer & designer</span>
      </Typography>
      <Button
      variant="contained"
      className="custom-btn btn-5" // Apply custom classes for pseudo-elements and hover
      sx={{
        fontFamily: '"Orbitron", sans-serif',
        fontSize: '0.8rem',
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
    </Grid>
        </Grid>
      </Box>
  );
};

export default Hero;