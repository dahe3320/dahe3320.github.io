import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects.json';
import { Container, Typography, Box, IconButton, Modal, Fade, Backdrop, Grid, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import LaunchIcon from '@mui/icons-material/Launch';
import Field from './Field';
import ScrollReveal from './ScrollReveal';

const Galleries = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => projects.find((p) => p.id === id) || null, [id]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [pageReady, setPageReady] = useState(false);

  const totalImages = project ? project.images.length : 0;
  const loadedCount = Object.keys(loadedImages).length;
  const loadProgress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0;
  const allImagesLoaded = totalImages > 0 && loadedCount >= totalImages;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Transition from loader → content once all images are ready
  useEffect(() => {
    if (allImagesLoaded) {
      const timer = setTimeout(() => setPageReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [allImagesLoaded]);

  const handleBackClick = () => navigate('/');

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrev = useCallback(() => {
    if (!project) return;
    setLightboxIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  }, [project]);

  const goToNext = useCallback(() => {
    if (!project) return;
    setLightboxIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrev, goToNext]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  // ── Not found ──
  if (!project) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h5" sx={{ color: '#6da5c0' }}>Project not found.</Typography>
      </Box>
    );
  }

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <Field />

      {/* ── Loading Overlay ── */}
      <Fade in={!pageReady} timeout={600} unmountOnExit>
        <Box sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#05161A',
          gap: 4,
        }}>
          {/* Animated loader ring */}
          <Box sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '3px solid rgba(15, 150, 156, 0.15)',
            borderTopColor: '#0f969c',
            animation: 'loaderSpin 0.8s linear infinite',
            '@keyframes loaderSpin': {
              to: { transform: 'rotate(360deg)' },
            },
          }} />

          <Box sx={{ width: 200, textAlign: 'center' }}>
            <Typography variant="body2" sx={{
              color: '#6da5c0',
              mb: 1.5,
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
            }}>
              Loading {loadedCount}/{totalImages}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={loadProgress}
              sx={{
                height: 3,
                borderRadius: 2,
                bgcolor: 'rgba(15, 150, 156, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#0f969c',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                },
              }}
            />
          </Box>
        </Box>
      </Fade>

      {/* ── Page Content ── */}
      <Box sx={{
        opacity: pageReady ? 1 : 0,
        transform: pageReady ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8, zIndex: 1, color: '#f0f0f0', position: 'relative' }}>

          {/* ── Back Button ── */}
          <Box
            onClick={handleBackClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleBackClick()}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 6,
              px: 2.5,
              py: 1.2,
              cursor: 'pointer',
              borderRadius: '50px',
              border: '1px solid rgba(15, 150, 156, 0.3)',
              bgcolor: 'rgba(7, 46, 51, 0.4)',
              backdropFilter: 'blur(8px)',
              color: '#6da5c0',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                bgcolor: '#0f969c',
                color: '#05161A',
                borderColor: '#0f969c',
                transform: 'translateX(-4px)',
                boxShadow: '0 4px 20px rgba(15, 150, 156, 0.3)',
              },
              '&:hover .back-arrow': {
                transform: 'translateX(-3px)',
              },
            }}
          >
            <ArrowBackIcon className="back-arrow" sx={{ fontSize: 20, transition: 'transform 0.3s ease' }} />
            <Typography sx={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}>
              Back to projects
            </Typography>
          </Box>

          {/* ── Project Header ── */}
          <ScrollReveal variant="fade-up" duration={800}>
            <Box sx={{
              textAlign: 'center',
              mb: 8,
              py: 4,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #0f969c, transparent)',
              },
            }}>
              <Typography variant="h6" sx={{
                color: '#0f969c',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                mb: 2,
              }}>
                Project
              </Typography>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: { xs: '1.8rem', md: '2.8rem' },
                  background: 'linear-gradient(135deg, #6da5c0 0%, #0f969c 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                }}
              >
                {project.title}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: 'rgba(109, 165, 192, 0.75)',
                  maxWidth: 650,
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                }}
              >
                {project.description}
              </Typography>
            </Box>
          </ScrollReveal>

          {/* ── Project Details Card (moved above images) ── */}
          <ScrollReveal variant="fade-up" duration={800} delay={100}>
            <Box sx={{
              mb: 8,
              backgroundColor: 'rgba(7, 46, 51, 0.6)',
              backdropFilter: 'blur(12px)',
              padding: { xs: 3, md: 5 },
              border: '1px solid rgba(15, 150, 156, 0.25)',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #0f969c 50%, transparent 100%)',
              },
            }}>
              <Grid container spacing={4} alignItems="flex-start">
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{
                    mb: 2,
                    color: '#0f969c',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    Details
                  </Typography>
                  {project.details && (
                    <Typography variant="body1" sx={{
                      lineHeight: 1.9,
                      color: 'rgba(240, 240, 240, 0.85)',
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                    }}>
                      {project.details}
                    </Typography>
                  )}
                  {project.link && (
                    <Box sx={{ mt: 3 }}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <Box sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2.5,
                          py: 1,
                          borderRadius: '50px',
                          border: '1px solid rgba(15, 150, 156, 0.4)',
                          color: '#6da5c0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(15, 150, 156, 0.15)',
                            borderColor: '#0f969c',
                            color: '#0f969c',
                          },
                        }}>
                          <LaunchIcon sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                            View project
                          </Typography>
                        </Box>
                      </a>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{
                    mb: 2,
                    color: '#0f969c',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    Technologies
                  </Typography>
                  {project.technologies.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {project.technologies.map((tech, i) => (
                        <Box key={i} sx={{
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(109, 165, 192, 0.08)',
                          borderRadius: 2,
                          padding: 1,
                          border: '1px solid rgba(109, 165, 192, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(109, 165, 192, 0.15)',
                            borderColor: 'rgba(15, 150, 156, 0.4)',
                            transform: 'translateY(-2px)',
                          },
                        }}>
                          <img src={tech} alt="technology" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </ScrollReveal>

          {/* ── Gallery Section Header ── */}
          <ScrollReveal variant="fade-up" duration={800}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{
                color: '#0f969c',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                mb: 1,
              }}>
                Gallery
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(109, 165, 192, 0.6)' }}>
                {totalImages} image{totalImages !== 1 ? 's' : ''} — click to expand
              </Typography>
            </Box>
          </ScrollReveal>

          {/* ── Image Grid (CSS Grid — no clipping) ── */}
          <Grid container spacing={2} sx={{ mb: 8 }}>
            {project.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ScrollReveal variant="fade-up" delay={index * 60} duration={600} threshold={0.05}>
                  <Box
                    onClick={() => openLightbox(index)}
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                      bgcolor: 'rgba(7, 46, 51, 0.3)',
                      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-6px) scale(1.01)',
                        boxShadow: '0 12px 40px rgba(15, 150, 156, 0.25)',
                      },
                      '&:hover .image-overlay': {
                        opacity: 1,
                      },
                    }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      onLoad={() => handleImageLoad(index)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: '8px',
                        opacity: loadedImages[index] ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                      }}
                      loading="eager"
                    />
                    {/* Hover overlay */}
                    <Box
                      className="image-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(5, 22, 26, 0.8) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        px: 2,
                        pb: 2,
                      }}
                    >
                      <Typography variant="body2" sx={{
                        color: 'rgba(240, 240, 240, 0.9)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.1em',
                      }}>
                        {index + 1} / {totalImages}
                      </Typography>
                      <OpenInFullIcon sx={{ color: 'rgba(240, 240, 240, 0.7)', fontSize: 18 }} />
                    </Box>
                  </Box>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Lightbox Modal ── */}
      <Modal
        open={lightboxOpen}
        onClose={closeLightbox}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(5, 22, 26, 0.96)', backdropFilter: 'blur(12px)' },
            timeout: 300,
          },
        }}
      >
        <Fade in={lightboxOpen}>
          <Box sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}>
            {/* Close */}
            <IconButton
              onClick={closeLightbox}
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: '#f0f0f0',
                bgcolor: 'rgba(15, 150, 156, 0.15)',
                border: '1px solid rgba(15, 150, 156, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(15, 150, 156, 0.3)',
                  borderColor: '#0f969c',
                  transform: 'rotate(90deg)',
                },
                zIndex: 10,
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Prev */}
            {project.images.length > 1 && (
              <IconButton
                onClick={goToPrev}
                sx={{
                  position: 'absolute',
                  left: { xs: 12, md: 32 },
                  color: '#f0f0f0',
                  bgcolor: 'rgba(15, 150, 156, 0.15)',
                  border: '1px solid rgba(15, 150, 156, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(15, 150, 156, 0.3)',
                    borderColor: '#0f969c',
                    transform: 'translateX(-3px)',
                  },
                  zIndex: 10,
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            )}

            {/* Image */}
            <Box sx={{
              maxWidth: '88vw',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}>
              <img
                src={project.images[lightboxIndex]}
                alt={`${project.title} - ${lightboxIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '82vh',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
                }}
              />
              {/* Thumbnails strip */}
              <Box sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                maxWidth: '80vw',
                py: 1,
                px: 1,
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(15,150,156,0.3)', borderRadius: 2 },
              }}>
                {project.images.map((thumb, i) => (
                  <Box
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    sx={{
                      width: 56,
                      height: 40,
                      minWidth: 56,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: i === lightboxIndex ? '2px solid #0f969c' : '2px solid transparent',
                      opacity: i === lightboxIndex ? 1 : 0.5,
                      transition: 'all 0.25s ease',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    <img
                      src={thumb}
                      alt={`thumb-${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Next */}
            {project.images.length > 1 && (
              <IconButton
                onClick={goToNext}
                sx={{
                  position: 'absolute',
                  right: { xs: 12, md: 32 },
                  color: '#f0f0f0',
                  bgcolor: 'rgba(15, 150, 156, 0.15)',
                  border: '1px solid rgba(15, 150, 156, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(15, 150, 156, 0.3)',
                    borderColor: '#0f969c',
                    transform: 'translateX(3px)',
                  },
                  zIndex: 10,
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Box>
        </Fade>
      </Modal>
    </section>
  );
};

export default Galleries;
