import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // Check if device is touch-based or mobile
  const isTouchDevice = typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    // Hide on touch devices
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    const onMouseLeaveWindow = () => setIsVisible(false);
    const onMouseEnterWindow = () => setIsVisible(true);

    // Smooth ring follow
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) scale(${isHovering ? 1.8 : 1})`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    // Track interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], .MuiIconButton-root, .MuiButton-root, img');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      cancelAnimationFrame(rafId.current);
    };
  }, [isHovering, isVisible]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  const baseStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 99999,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          ...baseStyles,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          backgroundColor: '#0f969c',
          boxShadow: '0 0 10px rgba(15, 150, 156, 0.8), 0 0 20px rgba(15, 150, 156, 0.4)',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          ...baseStyles,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          border: `2px solid ${isHovering ? '#0f969c' : 'rgba(15, 150, 156, 0.5)'}`,
          transition: 'border-color 0.3s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;