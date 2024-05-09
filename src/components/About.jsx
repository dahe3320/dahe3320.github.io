import React from "react";
import '../App.css';
import logopack from "/assets/images/logopack.svg";
import { Container, Grid, Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const About = () => {
  return (
    <Container maxWidth="md">
        <Grid container spacing={30} justifyContent="center" alignItems="center" style={{height: '100vh' }}>
            <Grid item xs={12}>
            <Box textAlign="center">
            <Typography variant="h3" sx={{ fontFamily: 'Orbitron, sans-serif !important', py: 5 }} gutterBottom>
                Om mig
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 16, textAlign: 'left' }} paragraph>
                Jag är en kreativ och driven person som brinner för utveckling i form av grafisk design, 
                3D-modellering och webbutveckling. Kunskaper inom skapandet av grafisk design, 3D-modellering och animering genom:
            </Typography>
            <List sx={{ fontSize: 16, mb: 5 }}>
            <Grid container spacing={2}>
            {/* Each Grid item represents a column width of 6 (out of 12, creating 2 columns) */}
              <Grid item xs={6}>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{ color: '#7B6099' }} />
                    </ListItemIcon>
                    <ListItemText primary="Adobe Photoshop" />
                </ListItem>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{ color: '#7B6099' }} />
                    </ListItemIcon>
                    <ListItemText primary="Adobe Illustrator" />
                </ListItem>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{ color: '#7B6099' }} />
                    </ListItemIcon>
                    <ListItemText primary="Adobe After Effects" />
                </ListItem>
            </Grid>
            <Grid item xs={6}>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{ color: '#7B6099' }} />
                    </ListItemIcon>
                    <ListItemText primary="Autodesk Maya" />
                </ListItem>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{ color: '#7B6099' }} />
                    </ListItemIcon>
                    <ListItemText primary="Blender" />
                </ListItem>
              </Grid>
            </Grid>
                    <Typography variant="body1" sx={{ fontSize: 16, my: 4, textAlign: 'left' }} paragraph>
                        Kombinering av webbutveckling och 3D-grafik:
                    </Typography>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{color: '#7B6099'}}/> {/* Example icon for the text below */}
                    </ListItemIcon>
                    <ListItemText primary="React Three Fiber" />
                </ListItem>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{color: '#7B6099'}}/> {/* Example icon for the text below */}
                    </ListItemIcon>
                    <ListItemText primary="Three.js och WebGL" />
                </ListItem>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{color: '#7B6099'}}/> {/* Example icon for the text below */}
                    </ListItemIcon>
                    <ListItemText primary="i kombination med skapandet av 3D-modeller med Blender och Autodesk Maya." />
                </ListItem>
                <Typography variant="body1" sx={{ fontSize: 16, my: 4, textAlign: 'left' }} paragraph>
                    Utveckling av webbplatser och webbapplikationer:
                </Typography>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{color: '#7B6099'}}/> {/* Use a different icon if more appropriate */}
                    </ListItemIcon>
                    <ListItemText primary="HTML, CSS, JavaScript, React" />
                </ListItem>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{color: '#7B6099'}}/> {/* Use a different icon if more appropriate */}
                    </ListItemIcon>
                    <ListItemText primary="Flutter och Dart." />
                </ListItem>
                <ListItem sx={{ mb: -2 }}>
                    <ListItemIcon>
                        <DoubleArrowIcon sx={{color: '#7B6099'}}/> {/* Use a different icon if more appropriate */}
                    </ListItemIcon>
                    <ListItemText primary="Node.js, express.js, Electron" />
                </ListItem>
            </List>
            <img src={logopack} alt="competence" style={{ maxWidth: '100%', paddingBottom: 200 }} />
        </Box>
            </Grid>
        </Grid>
    </Container>
);
}
export default About;