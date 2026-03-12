import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BrushIcon from '@mui/icons-material/Brush';
import StorageIcon from '@mui/icons-material/Storage';
import ScrollReveal from './ScrollReveal';

const areas = [
  { icon: <CodeIcon />, title: 'Fullstack Development', description: 'Building end-to-end software and web applications with modern technologies.' },
  { icon: <StorageIcon />, title: 'Database Management', description: 'Structuring and monitoring databases for optimal performance.' },
  { icon: <DesignServicesIcon />, title: 'UI Design', description: 'Creating responsive and interactive user interfaces.' },
  { icon: <BrushIcon />, title: '3D Modeling & Rendering', description: 'Creating compelling 3D models and visuals.' },
];

const Proficiency = () => {
  return (
    <Box sx={{
      py: { xs: 8, md: 12 },
      px: { xs: 2, sm: 4, md: 8, lg: 12 },
      textAlign: 'center',
      maxWidth: '1800px',
      margin: '0 auto',
    }}>
      <Box id="proficiency" sx={{ scrollMarginTop: '80px' }}>
        <ScrollReveal variant="fade-up" duration={900}>
          <Typography variant="h6" sx={{ textAlign: 'left', color: '#0f969c', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem' }} gutterBottom>
            Techstack
          </Typography>
          <Typography variant="h3" sx={{ fontFamily: 'Orbitron, sans-serif', textAlign: 'left', pb: 5 }} gutterBottom>
            Proficiency
          </Typography>
        </ScrollReveal>

        <Box sx={{
          display: 'flex',
          gap: 3,
          pb: 5,
          justifyContent: 'center',
          flexWrap: { xs: 'wrap', lg: 'nowrap' },
        }}>
          {areas.map((area, index) => (
            <ScrollReveal key={index} variant="fade-up" delay={index * 150} duration={800}>
              <Card className="gradient-border" sx={{
                height: '300px',
                flex: '1 1 0',
                minWidth: { xs: '100%', sm: 'calc(50% - 12px)', lg: '0' },
                background: '#05161A',
                overflow: 'visible',
                borderRadius: 2,
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(15, 150, 156, 0.15)',
                },
              }}>
                <CardMedia sx={{ pt: 2, pb: 2 }}>
                  <Box sx={{
                    fontSize: 60,
                    color: '#6da5c0',
                    scale: 2.5,
                    transition: 'color 0.3s ease',
                  }}>
                    {area.icon}
                  </Box>
                </CardMedia>
                <CardContent>
                  <Typography sx={{ fontSize: '60%', textAlign: 'center', color: '#6da5c0', mb: 2 }}>
                    {area.title}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, color: '#f0f0f0' }}>
                    {area.description}
                  </Typography>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Proficiency;
