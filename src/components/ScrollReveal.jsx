import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@mui/material';

/**
 * ScrollReveal — wraps children and animates them into view.
 *
 * Variants:
 *  2D: 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'scale', 'blur', 'rotate'
 *  3D: 'depth-rise', 'depth-flip', 'depth-swing', 'depth-zoom', 'cinematic'
 */
const variants = {
  // ── 2D variants ──
  'fade-up':    (d) => ({ transform: `translateY(${d}px)`,  opacity: 0 }),
  'fade-down':  (d) => ({ transform: `translateY(-${d}px)`, opacity: 0 }),
  'fade-left':  (d) => ({ transform: `translateX(-${d}px)`, opacity: 0 }),
  'fade-right': (d) => ({ transform: `translateX(${d}px)`,  opacity: 0 }),
  'scale':      ()  => ({ transform: 'scale(0.85)',          opacity: 0 }),
  'blur':       ()  => ({ filter: 'blur(12px)',              opacity: 0 }),
  'rotate':     ()  => ({ transform: 'rotate(-6deg) scale(0.9)', opacity: 0 }),

  // ── 3D variants ──
  // Rises from below with depth — like coming from behind the screen
  'depth-rise': (d) => ({
    transform: `perspective(1200px) translateY(${d}px) translateZ(-200px) rotateX(8deg)`,
    opacity: 0,
  }),
  // Flips in from rotated state
  'depth-flip': () => ({
    transform: 'perspective(1200px) rotateX(-15deg) translateZ(-150px)',
    opacity: 0,
    filter: 'blur(4px)',
  }),
  // Swings in from the side with 3D rotation
  'depth-swing': (d) => ({
    transform: `perspective(1200px) rotateY(12deg) translateX(${d}px) translateZ(-100px)`,
    opacity: 0,
  }),
  // Zooms from far away in Z-space
  'depth-zoom': () => ({
    transform: 'perspective(1200px) translateZ(-500px)',
    opacity: 0,
    filter: 'blur(6px)',
  }),
  // Cinematic: combines tilt, depth, blur, and slide
  'cinematic': (d) => ({
    transform: `perspective(1200px) translateY(${d * 0.6}px) translateZ(-300px) rotateX(6deg) rotateY(-3deg)`,
    opacity: 0,
    filter: 'blur(3px)',
  }),
};

const resolvedStyle = {
  transform: 'perspective(1200px) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotate(0deg) scale(1)',
  opacity: 1,
  filter: 'none',
};

const ScrollReveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 800,
  distance = 60,
  threshold = 0.15,
  once = true,
  style = {},
  ...rest
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  const initialStyle = (variants[variant] || variants['fade-up'])(distance);

  return (
    <Box
      ref={ref}
      sx={{
        transformStyle: 'preserve-3d',
        transition: `
          transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          opacity ${duration * 0.7}ms ease ${delay}ms,
          filter ${duration * 0.5}ms ease ${delay + duration * 0.3}ms
        `,
        willChange: 'transform, opacity, filter',
        ...(inView ? resolvedStyle : initialStyle),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default ScrollReveal;