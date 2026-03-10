import React, { useRef, useState, createContext, useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, IconButton, Tooltip } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

const colorThemes = [
  { name: 'Ocean',   colors: ['#0c7078', '#0f969c', '#294d61'] },
  { name: 'Sunset',  colors: ['#ff6b35', '#f7931e', '#c62368'] },
  { name: 'Aurora',  colors: ['#00d2ff', '#7b2ff7', '#c471f5'] },
  { name: 'Forest',  colors: ['#2d6a4f', '#40916c', '#52b788'] },
  { name: 'Neon',    colors: ['#ff00ff', '#00ffff', '#ffff00'] },
  { name: 'Mono',    colors: ['#ffffff', '#aaaaaa', '#555555'] },
];

const FloatingMesh = ({ position, color, geometry, speed, amplitudeX, amplitudeY, amplitudeZ, phaseX, phaseY, phaseZ }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed;
    meshRef.current.position.x = position[0] + Math.sin(time + phaseX) * amplitudeX;
    meshRef.current.position.y = position[1] + Math.sin(time + phaseY) * amplitudeY;
    meshRef.current.position.z = position[2] + Math.cos(time + phaseZ) * amplitudeZ;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Field = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const currentColors = colorThemes[themeIndex].colors;

  const geometries = [
    <octahedronGeometry args={[1]} />,
    <dodecahedronGeometry args={[1]} />,
    <icosahedronGeometry args={[1]} />,
  ];

  const positions = [
    [-6, 2, -2],
    [-6, -2, -4],
    [-6, 0, -6],
    [6, 2, -2],
    [6, -2, -4],
    [6, 0, -6],
  ];

  const floatingObjects = positions.map((position, index) => ({
    position,
    color: currentColors[index % currentColors.length],
    geometry: geometries[index % geometries.length],
    speed: 0.2 + Math.random() * 0.1, // Slightly vary speeds
    amplitudeX: 1 + Math.random() * 1.5, // Random amplitude for X-axis
    amplitudeY: 1 + Math.random() * 1.5, // Random amplitude for Y-axis
    amplitudeZ: 1 + Math.random() * 1.5, // Random amplitude for Z-axis
    phaseX: Math.random() * Math.PI * 2, // Random phase offset for X-axis
    phaseY: Math.random() * Math.PI * 2, // Random phase offset for Y-axis
    phaseZ: Math.random() * Math.PI * 2, // Random phase offset for Z-axis
  }));

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % colorThemes.length);
  };

  return (
    <>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {floatingObjects.map((obj, index) => (
          <FloatingMesh
            key={`${themeIndex}-${index}`}
            position={obj.position}
            color={obj.color}
            geometry={obj.geometry}
            speed={obj.speed}
            amplitudeX={obj.amplitudeX}
            amplitudeY={obj.amplitudeY}
            amplitudeZ={obj.amplitudeZ}
            phaseX={obj.phaseX}
            phaseY={obj.phaseY}
            phaseZ={obj.phaseZ}
          />
        ))}
      </Canvas>

      {/* Frosted glass effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      />

      {/* Color theme toggle button */}
      <Tooltip title={`Theme: ${colorThemes[themeIndex].name}`} placement="left" arrow>
        <IconButton
          onClick={cycleTheme}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 10,
            color: currentColors[1],
            border: `2px solid ${currentColors[1]}`,
            bgcolor: 'rgba(5, 22, 26, 0.7)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.4s ease',
            '&:hover': {
              bgcolor: 'rgba(5, 22, 26, 0.9)',
              transform: 'rotate(45deg) scale(1.1)',
              boxShadow: `0 0 20px ${currentColors[1]}40`,
            },
          }}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Field;