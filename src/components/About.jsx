import React, { useState } from "react";
import { Grid, Box, Typography, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ScrollReveal from './ScrollReveal';

const stats = [
  { value: '10+', label: 'Projects Completed' },
  { value: '2+', label: 'Years of experience' },
  { value: '15+', label: 'Technologies' },
  { value: '1', label: 'Degree' },
];

const easterEggImages = [
  '/assets/images/dhfoto.jpg',        // default
  '/assets/images/dhfoto-pixel.png',  // easter egg alt image - pixel
];

const About = () => {
  const [imgClicks, setImgClicks] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [imgShake, setImgShake] = useState(false);

  const handleImageClick = () => {
    const next = imgClicks + 1;
    setImgClicks(next);

    if (next < 3) {
      // Subtle shake hint
      setImgShake(true);
      setTimeout(() => setImgShake(false), 500);
    }

    if (next >= 3) {
      setEasterEggActive((prev) => !prev);
      setImgClicks(0);
    }
  };

  return (
    <>
      {/* ── Bold Intro Statement ── */}
      <Box sx={{
        position: 'relative',
        py: { xs: 10, md: 16 },
        textAlign: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(15,150,156,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        },
      }}>
        <ScrollReveal variant="fade-up" duration={1000}>
          <Typography variant="h6" sx={{
            color: '#0f969c',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontSize: { xs: '0.75rem', md: '0.9rem' },
            mb: 3,
          }}>
            Who I Am
          </Typography>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200} duration={1000}>
          <Typography variant="h2" sx={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: 1.2,
            px: 3,
            background: 'linear-gradient(135deg, #6da5c0 0%, #0f969c 50%, #6da5c0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Developer. Designer. Creator.
          </Typography>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={400} duration={1000}>
          <Typography variant="body1" sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            color: 'rgba(109, 165, 192, 0.8)',
            maxWidth: '700px',
            margin: '0 auto',
            mt: 4,
            px: 3,
            lineHeight: 1.8,
          }}>
            I love creating compelling digital experiences - that combines complex tech solutions with effective design. Turning complex ideas into elegant, interactive realities.
          </Typography>
        </ScrollReveal>
      </Box>

      {/* ── Stats Counter Row ── */}
      <Box sx={{
        py: { xs: 6, md: 8 },
        maxWidth: '1200px',
        margin: '0 auto',
        px: { xs: 3, md: 6 },
      }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <ScrollReveal variant="scale" delay={index * 150} duration={700}>
                <Box sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(7, 46, 51, 0.4)',
                  border: '1px solid rgba(15, 150, 156, 0.2)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    border: '1px solid rgba(15, 150, 156, 0.6)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 32px rgba(15, 150, 156, 0.15)',
                  },
                }}>
                  <Typography sx={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: { xs: '2rem', md: '2.8rem' },
                    color: '#0f969c',
                    fontWeight: 700,
                    lineHeight: 1,
                    mb: 1,
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    color: '#6da5c0',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── About Me Profile Section ── */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        maxWidth: '1200px',
        margin: '0 auto',
        padding: { xs: 4, md: 8, lg: 12 },
      }}>
        <Box id="about" sx={{ scrollMarginTop: '80px' }}>
          <ScrollReveal variant="fade-right" duration={900}>
            <Typography variant="h6" sx={{ textAlign: 'left', color: '#0f969c', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem' }} gutterBottom>
              Profile
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: 'Orbitron, sans-serif', textAlign: 'left', pb: 5 }} gutterBottom>
              About me
            </Typography>
          </ScrollReveal>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <ScrollReveal variant="fade-right" delay={200} duration={900}>
                <Box
                  onClick={handleImageClick}
                  className="gradient-border"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    position: 'relative',
                    cursor: 'pointer',
                    animation: imgShake ? 'imgShake 0.5s ease' : 'none',
                    transition: 'transform 0.4s ease',
                    '@keyframes imgShake': {
                      '0%, 100%': { transform: 'rotate(0deg)' },
                      '20%': { transform: 'rotate(-2deg)' },
                      '40%': { transform: 'rotate(2deg)' },
                      '60%': { transform: 'rotate(-1deg)' },
                      '80%': { transform: 'rotate(1deg)' },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, transparent 60%, rgba(5,22,26,0.8) 100%)',
                      zIndex: 1,
                      borderRadius: '10px',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  <img
                    src={easterEggActive ? easterEggImages[1] : easterEggImages[0]}
                    alt="Me :D"
                    style={{
                      borderRadius: '10px',
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover',
                      transition: 'opacity 0.4s ease, transform 0.6s ease',
                      transform: easterEggActive ? 'scale(1.02)' : 'scale(1)',
                    }}
                  />
                  {/* Easter egg badge */}
                  {easterEggActive && (
                    <Box sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                      zIndex: 2,
                      px: 1.5,
                      py: 0.5,
                      bgcolor: 'rgba(5, 22, 26, 0.85)',
                      border: '1px solid #0f969c',
                      borderRadius: '6px',
                      backdropFilter: 'blur(8px)',
                      animation: 'fadeInUp 0.4s ease',
                      '@keyframes fadeInUp': {
                        '0%': { opacity: 0, transform: 'translateY(10px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}>
                      <Typography sx={{ fontSize: '0.7rem', color: '#0f969c', fontFamily: '"Kode Mono", monospace' }}>
                        Pixelized me!
                      </Typography>
                    </Box>
                  )}
                </Box>
              </ScrollReveal>
            </Grid>

            <Grid item xs={12} md={6}>
              <ScrollReveal variant="fade-left" delay={300} duration={900}>
                <Typography variant="body1" sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  textAlign: 'left',
                  mb: 4,
                  lineHeight: 1.9,
                  color: 'rgba(240, 240, 240, 0.9)',
                }} paragraph>
                  With a background in Media Technology and Data Science, and an expertise in creating robust and scalable Web & server-side applications. 
                  I specialize primarily in PHP/Laravel, React, and SQL management. Currently employeed fulltime as full-stack developer.
                </Typography>

                <Typography variant="body1" sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  textAlign: 'left',
                  mb: 4,
                  lineHeight: 1.9,
                  color: 'rgba(240, 240, 240, 0.7)',
                }} paragraph>
                  I'm always eager to learn new technologies, and keeping up with latest trends and practices in the industry. My passion lays in testing out and building stuff with clients in multiple fields,
                  such as e-commerce, fintech, and business automation.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    transition: 'background 0.3s ease',
                    '&:hover': { background: 'rgba(15, 150, 156, 0.08)' },
                  }}>
                    <IconButton
                      href="mailto:danielhed33@gmail.com"
                      sx={{
                        color: '#0f969c',
                        border: '1px solid rgba(15, 150, 156, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#0f969c',
                          boxShadow: '0 0 16px rgba(15, 150, 156, 0.3)',
                        },
                      }}
                      aria-label="Email"
                    >
                      <MailIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontSize: 14, color: '#6da5c0' }}>
                      danielhed33@gmail.com
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    transition: 'background 0.3s ease',
                    '&:hover': { background: 'rgba(15, 150, 156, 0.08)' },
                  }}>
                    <IconButton
                      aria-label="Address"
                      sx={{
                        color: '#0f969c',
                        border: '1px solid rgba(15, 150, 156, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#0f969c',
                          boxShadow: '0 0 16px rgba(15, 150, 156, 0.3)',
                        },
                      }}
                    >
                      <PinDropIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontSize: 14, color: '#6da5c0' }}>
                      Stockholm, Sweden
                    </Typography>
                  </Box>
                </Box>
              </ScrollReveal>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default About;