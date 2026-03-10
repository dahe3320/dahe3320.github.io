import React, { useState, useEffect, useRef } from 'react';
import '../index.css'
import { AppBar, Container, Toolbar, Typography, Box, Button } from '@mui/material';

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Proficiency', target: 'proficiency' },
  { label: 'Projects', target: 'projects' },
];

export default function Header () {
    const [scrolled, setScrolled] = useState(false);
    const ticking = useRef(false);

    useEffect(() => {
      const onScroll = () => {
        if (ticking.current) return;
        ticking.current = true;

        requestAnimationFrame(() => {
          setScrolled(window.scrollY > window.innerHeight * 0.85);
          ticking.current = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <AppBar
          position="sticky"
          sx={{
            // Glass background — nearly transparent at top, frosted when scrolled
            background: scrolled
              ? 'linear-gradient(135deg, rgba(15, 150, 156, 0.08) 0%, rgba(5, 22, 26, 0.4) 50%, rgba(109, 165, 192, 0.06) 100%)'
              : 'linear-gradient(135deg, rgba(15, 150, 156, 0.03) 0%, rgba(5, 22, 26, 0.08) 50%, rgba(109, 165, 192, 0.02) 100%)',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(8px) saturate(1.1)',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(8px) saturate(1.1)',
            // Border — matches hero card style
            borderBottom: scrolled
              ? '1px solid rgba(15, 150, 156, 0.2)'
              : '1px solid rgba(15, 150, 156, 0.06)',
            // Multi-layer shadow like hero card
            boxShadow: scrolled
              ? `inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
                 inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                 0 4px 24px rgba(0, 0, 0, 0.3),
                 0 0 60px rgba(15, 150, 156, 0.06)`
              : 'none',
            // Smooth transition between states
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
            // Top highlight edge — matching hero card
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: scrolled
                ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 70%, transparent 100%)',
              transition: 'all 0.6s ease',
              pointerEvents: 'none',
            },
            // Gradient sheen overlay — matching hero card
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: scrolled
                ? 'linear-gradient(160deg, rgba(255, 255, 255, 0.03) 0%, transparent 40%, transparent 60%, rgba(15, 150, 156, 0.03) 100%)'
                : 'transparent',
              transition: 'all 0.6s ease',
              pointerEvents: 'none',
            },
          }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#hero"
                    onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('hero');
                    }}
                    sx={{
                    display: 'flex',
                    fontFamily: 'Orbitron, sans-serif !important',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#f0f0f0',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                        color: '#6da5c0',
                    },
                    }}
                >
                    DH
                </Typography>

                <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1, md: 2 } }}>
                    {navItems.map((item) => (
                    <Button
                        key={item.target}
                        onClick={() => scrollToSection(item.target)}
                        sx={{
                        color: '#f0f0f0',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        position: 'relative',
                        minWidth: 'auto',
                        px: { xs: 1, sm: 1.5, md: 2 },
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: '#0f969c',
                            backgroundColor: 'transparent',
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: '2px',
                            backgroundColor: '#0f969c',
                            transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                            width: '80%',
                        },
                        }}
                    >
                        {item.label}
                    </Button>
                    ))}
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}