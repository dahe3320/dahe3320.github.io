import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

/**
 * ParallaxSection — creates depth by translating content based on scroll position.
 *
 * Props:
 *  - speed:          parallax multiplier (0 = static, negative = slower, positive = faster)
 *  - zDepth:         translateZ offset scaled by scroll (px)
 *  - rotateOnScroll: subtle rotateX tilt scaled by scroll (degrees)
 *  - fadeOnExit:     fade opacity to 0 as section scrolls out the top
 *  - blurOnExit:     max blur (px) as section scrolls out the top
 *  - scaleRange:     [min, max] scale that peaks at viewport center
 *  - perspective:    CSS perspective value (default 1200)
 *  - sticky:         if true, uses position sticky (good for hero)
 */
const ParallaxSection = ({
  children,
  speed = 0,
  zDepth = 0,
  rotateOnScroll = 0,
  fadeOnExit = false,
  scaleRange = null,
  blurOnExit = 0,
  perspective = 1200,
  sticky = false,
  sx = {},
  ...rest
}) => {
  const ref = useRef(null);
  const [styles, setStyles] = useState({});
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        if (!ref.current) {
          ticking.current = false;
          return;
        }

        const rect = ref.current.getBoundingClientRect();
        const windowH = window.innerHeight;

        // progress: 0 when section top is at viewport bottom, 
        //           0.5 when centered, 1 when top is at viewport top
        const rawProgress = 1 - rect.top / windowH;
        const centerProgress = Math.max(0, Math.min(1, rawProgress));
        // offset from center: -0.5 (bottom) to 0.5 (top)
        const offset = centerProgress - 0.5;

        // exitProgress: 0 when section top at viewport center, 
        //               1 when section fully scrolled past
        const exitProgress = Math.max(0, Math.min(1, (offset - 0.1) / 0.4));

        const transforms = [];
        let opacity = 1;
        let filter = 'none';

        // Parallax Y
        if (speed !== 0) {
          const yOffset = offset * speed * windowH * 0.3;
          transforms.push(`translateY(${yOffset}px)`);
        }

        // Z-depth
        if (zDepth !== 0) {
          const z = offset * zDepth;
          transforms.push(`translateZ(${z}px)`);
        }

        // Rotate on scroll
        if (rotateOnScroll !== 0) {
          const rotation = offset * rotateOnScroll;
          transforms.push(`rotateX(${rotation}deg)`);
        }

        // Scale
        if (scaleRange) {
          const [minScale, maxScale] = scaleRange;
          const distFromCenter = Math.abs(offset) * 2;
          const scale = maxScale - distFromCenter * (maxScale - minScale);
          transforms.push(`scale(${scale})`);
        }

        // Fade on exit (only when scrolling past top)
        if (fadeOnExit) {
          opacity = Math.max(0, 1 - exitProgress);
        }

        // Blur on exit
        if (blurOnExit > 0) {
          const blurAmount = exitProgress * blurOnExit;
          if (blurAmount > 0.1) {
            filter = `blur(${blurAmount}px)`;
          }
        }

        setStyles({
          transform: transforms.length > 0 ? transforms.join(' ') : 'none',
          opacity,
          filter,
        });

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed, zDepth, rotateOnScroll, fadeOnExit, scaleRange, blurOnExit]);

  return (
    <Box
      sx={{
        perspective: `${perspective}px`,
        perspectiveOrigin: 'center center',
        overflow: 'visible',
        ...(sticky && {
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }),
        ...sx,
      }}
      {...rest}
    >
      <Box
        ref={ref}
        sx={{
          willChange: 'transform, opacity, filter',
          transformStyle: 'preserve-3d',
          ...styles,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxSection;