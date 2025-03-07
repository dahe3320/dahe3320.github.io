import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

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
    const colors = ['#0c7078', '#0f969c', '#294d61'];
    const geometries = [
        <octahedronGeometry args={[1]} />,
        <dodecahedronGeometry args={[1]} />,
        <icosahedronGeometry args={[1]} />,
    ];

    // Define initial positions for the meshes
    const positions = [
        [-6, 2, -2],
        [-6, -2, -4],
        [-6, 0, -6],
        [6, 2, -2],
        [6, -2, -4],
        [6, 0, -6],
    ];

    // Generate floating objects with dynamic movement parameters
    const floatingObjects = positions.map((position, index) => ({
        position,
        color: colors[index % colors.length],
        geometry: geometries[index % geometries.length],
        speed: 0.2 + Math.random() * 0.1, // Slightly vary speeds
        amplitudeX: 1 + Math.random() * 1.5, // Random amplitude for X-axis
        amplitudeY: 1 + Math.random() * 1.5, // Random amplitude for Y-axis
        amplitudeZ: 1 + Math.random() * 1.5, // Random amplitude for Z-axis
        phaseX: Math.random() * Math.PI * 2, // Random phase offset for X-axis
        phaseY: Math.random() * Math.PI * 2, // Random phase offset for Y-axis
        phaseZ: Math.random() * Math.PI * 2, // Random phase offset for Z-axis
    }));

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
                }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {floatingObjects.map((obj, index) => (
                    <FloatingMesh
                        key={index}
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
                    background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
                    backdropFilter: 'blur(10px)', // Frosted glass blur effect
                }}
            />
        </>
    );
};

export default Field;
