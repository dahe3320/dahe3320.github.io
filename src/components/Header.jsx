import React from 'react';
import '../index.css' // Adjust the path as necessary
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Header () {
    return (
<AppBar position="static" sx={{ bgcolor: '#292033'}}>
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h5" // Adjust the size as needed
                        noWrap
                        component="a"
                        href="/Hero.jsx"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Orbitron, sans-serif !important',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#f5f5f5',
                            textDecoration: 'none',
                        }}
                    >
                        Daniel Hed
                    </Typography>
                    <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        <IconButton
                            component="a"
                            href="https://github.com/dahe3320"
                            aria-label="GitHub"
                            color="inherit"
                            sx={{
                                transition: 'transform 0.3s ease-in-out, background-color 0.3s ease, color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1)', // Slightly visible background on hover
                                    color: '#292033', // Change icon color on hover to dark
                                    transform: 'scale(1.1)', // Scale up and rotate slightly on hover
                                    // Add more styles here if needed
                                }
                            }}
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://www.linkedin.com/in/daniel-hed-232536263/"
                            aria-label="LinkedIn"
                            color="inherit"
                            sx={{
                                transition: 'transform 0.3s ease-in-out, background-color 0.3s ease, color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1)', // Matching background effect
                                    color: '#4a3661', // LinkedIn blue color on hover
                                    transform: 'scale(1.1)', // Scale up and rotate in the opposite direction
                                    // Additional styles can be added here
                                }
                            }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

/*
        <header>
            <ul className="nav-list">
                <h1>Daniel Hed</h1>
                <div className="nav-div">
                    <li className="nav-item">
                        <a href="https://github.com/dahe3320">
                            <img src={githubLogo} alt="GitHub" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="https://www.linkedin.com/in/daniel-hed-232536263/">
                            <img src={linkedinLogo} alt="LinkedIn" />
                        </a>
                    </li>
                </div>
            </ul>
        </header>
*/