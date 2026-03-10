import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@mui/material';
import * as THREE from 'three';

/**
 * A glowing wireframe with a blurred aura layer that pulses.
 */
const GlowingWireframe = ({
  position,
  geometry,
  color,
  speed,
  rotationSpeed,
  amplitude,
  phase,
}) => {
  const mainRef = useRef();
  const glowRef = useRef();
  const outerGlowRef = useRef();

  useFrame(({ clock }) => {
    if (!mainRef.current || !glowRef.current || !outerGlowRef.current) return;
    const t = clock.getElapsedTime() * speed;

    const x = position[0] + Math.sin(t + phase[0]) * amplitude[0];
    const y = position[1] + Math.cos(t * 0.7 + phase[1]) * amplitude[1];
    const z = position[2] + Math.sin(t * 0.5 + phase[2]) * amplitude[2];

    mainRef.current.position.set(x, y, z);
    glowRef.current.position.set(x, y, z);
    outerGlowRef.current.position.set(x, y, z);

    mainRef.current.rotation.x += rotationSpeed[0];
    mainRef.current.rotation.y += rotationSpeed[1];
    mainRef.current.rotation.z += rotationSpeed[2];

    glowRef.current.rotation.copy(mainRef.current.rotation);
    outerGlowRef.current.rotation.copy(mainRef.current.rotation);

    // Inner glow pulse
    const pulse = 0.06 + Math.sin(t * 1.8) * 0.03;
    glowRef.current.material.opacity = pulse;

    // Outer glow pulse (slower, offset phase)
    const outerPulse = 0.03 + Math.sin(t * 1.2 + 1.5) * 0.015;
    outerGlowRef.current.material.opacity = outerPulse;
  });

  return (
    <group>
      {/* Core wireframe */}
      <mesh ref={mainRef} position={position}>
        {geometry}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>
      {/* Inner glow layer */}
      <mesh ref={glowRef} position={position} scale={1.25}>
        {React.cloneElement(geometry)}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>
      {/* Outer glow aura */}
      <mesh ref={outerGlowRef} position={position} scale={1.5}>
        {React.cloneElement(geometry)}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.03}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/**
 * Scroll-reactive camera that pans down slowly as user scrolls.
 */
const ScrollCamera = () => {
  const scrollY = useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(({ camera }) => {
    const targetY = -(scrollY.current * 0.0003);
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.rotation.x += (targetY * 0.2 - camera.rotation.x) * 0.02;
  });

  return null;
};

const BackgroundMesh = () => {
  const [meshOpacity, setMeshOpacity] = useState(0);
  const ticking = useRef(false);

  // Hide while hero is visible, fade in once scrolled past hero
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;

        const fadeStart = windowH * 0.6;
        const fadeEnd = windowH;

        if (scrollY <= fadeStart) {
          setMeshOpacity(0);
        } else if (scrollY >= fadeEnd) {
          setMeshOpacity(0.7);
        } else {
          const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
          setMeshOpacity(progress * 0.7);
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const objects = useMemo(() => {
    const shapes = [
      <icosahedronGeometry args={[2.5, 1]} />,
      <dodecahedronGeometry args={[2, 0]} />,
      <torusGeometry args={[2, 0.6, 8, 16]} />,
      <icosahedronGeometry args={[3, 0]} />,
    ];

    // Theme colors
    const themeColors = [
      new THREE.Color('#0c7078'), // green
      new THREE.Color('#0f969c'), // stndgreen
      new THREE.Color('#6da5c0'), // light
    ];

    const configs = [
      { pos: [-14, 6, -12], shape: 0, colorIdx: 0 },
      { pos: [-18, -8, -18], shape: 1, colorIdx: 1 },
      { pos: [-10, -14, -8], shape: 2, colorIdx: 2 },
      { pos: [14, -6, -15], shape: 3, colorIdx: 1 },
      { pos: [18, 10, -20], shape: 2, colorIdx: 0 },
      { pos: [10, 16, -10], shape: 1, colorIdx: 2 },
    ];

    const seed = (i, k) => Math.sin(i * 127.1 + k * 311.7) * 0.5 + 0.5;

    return configs.map((cfg, i) => ({
      position: cfg.pos,
      geometry: shapes[cfg.shape],
      color: themeColors[cfg.colorIdx],
      speed: 0.08 + seed(i, 3) * 0.06,
      rotationSpeed: [
        (seed(i, 4) - 0.5) * 0.002,
        (seed(i, 5) - 0.5) * 0.002,
        (seed(i, 6) - 0.5) * 0.001,
      ],
      amplitude: [
        1 + seed(i, 7) * 2,
        1 + seed(i, 8) * 2,
        0.5 + seed(i, 9) * 1.5,
      ],
      phase: [
        seed(i, 10) * Math.PI * 2,
        seed(i, 11) * Math.PI * 2,
        seed(i, 12) * Math.PI * 2,
      ],
    }));
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        filter: 'blur(3px) brightness(1.6) saturate(1.4)',
        opacity: meshOpacity,
        transition: 'opacity 0.3s ease-out',
        willChange: 'opacity',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
      >
        <ScrollCamera />
        {objects.map((obj, i) => (
          <GlowingWireframe key={i} {...obj} />
        ))}
      </Canvas>
    </Box>
  );
};

export default BackgroundMesh;