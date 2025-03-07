import React from "react";
import { Container, Grid, Box, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PinDropIcon from '@mui/icons-material/PinDrop';
import WebIcon from '@mui/icons-material/Web';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MarketingIcon from '@mui/icons-material/LocalOffer';

const areas = [
  { icon: <WebIcon />, title: 'Web Development', description: 'Building responsive and modern websites.' },
  { icon: <DesignServicesIcon />, title: 'Graphic Design & 3D Modeling', description: 'Creating compelling visuals and 3D models.' },
  { icon: <MarketingIcon />, title: 'Digital Marketing', description: 'Enhancing brand presence and engagement.' },
];

const About = () => {
    return (
      <section>
        <Box sx={{ py: 8, textAlign: 'center', width: '40%'}}>
          {/* Logos with hover 3D effect */}
        <Typography variant="h6" sx={{ textAlign: 'left' }} gutterBottom>
            Techstack
        </Typography>
        <Typography variant="h3" sx={{ fontFamily: 'Orbitron, sans-serif', textAlign: 'left', pb: 5}} gutterBottom>
            Proficiency
        </Typography>
                <Grid container spacing={4} pb={5} justifyContent="center">
                {areas.map((area, index) => (
                    <Grid item xs={12} md={4} key={index}>
                    <Card className="gradient-border" sx={{ height: '300px', background: '#05161A', overflow: 'visible', borderRadius: 2, '&:hover': { opacity: 0.8 } }}>
                        <CardMedia sx={{ pt: 2, pb: 2 }}>
                        <Box sx={{ fontSize: 60, color: '#6da5c0', scale: 2.5 }}>
                            {area.icon}
                        </Box>
                        </CardMedia>
                        <CardContent>
                        <Typography sx={{ fontSize: '60%', textAlign: 'center', color: '#6da5c0', mb: 2 }} >
                            {area.title}
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', mt: 1,color: '#f0f0f0' }}>
                            {area.description}
                        </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
          <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" py={5}>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/wordpress-icon.svg" alt="Logo 1" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/react.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/vue.svg" alt="Logo 1" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/php.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/javascript.svg" alt="Logo 1" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/html-5.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/css.svg" alt="Logo 1" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/threejs.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/nextjs-icon.svg" alt="Logo 1" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/laravel.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/flutter.svg" alt="Logo 1" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/material-ui.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/figma.svg" alt="Logo 1" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/adobe-photoshop.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/adobe-after-effects.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/adobe-illustrator.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/blender.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/autodesk-maya.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/google-analytics.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/google-tag-manager.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/matomo-icon.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/jira.svg" alt="Logo 2" />
                    </div>
                </Box>
                <Box className="logo-container">
                    <div className="logo-circle">
                        <img src="/assets/images/trello.svg" alt="Logo 2" />
                    </div>
                </Box>
                </Box>
        <Typography variant="h6" sx={{ textAlign: 'left' }} gutterBottom>
            Profile
        </Typography>
        <Typography variant="h3" sx={{ fontFamily: 'Orbitron, sans-serif', textAlign: 'left', pb: 5}} gutterBottom>
            About me
        </Typography>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', gap: 10}}>
        <Box sx={{ width: '50%' }} className="gradient-border">
        <img src="/assets/images/dhfoto.jpg" alt="Me :D" style={{ borderRadius: '10px', width: '100%', height: '400px', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ width: '50%', py: 5}}>
        <Typography variant="body1" sx={{ fontSize: 16, textAlign: 'left' }} paragraph>
        With a background in graphic design, 3D modeling, and web development, I have a passion for creating visually appealing and interactive experiences. I have a bachelor's degree in Media Technology and Data Science, which have equipped me with a strong foundation in design principles, programming, and user experience. I am proficient in a variety of tools and technologies, including Adobe Creative Suite, Blender, Figma, React, and WordPress. I am always eager to learn new skills and technologies to stay up-to-date with the latest trends and best practices in the industry.
        </Typography>
        <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}> 
        <IconButton
        href="mailto:your-email@example.com"
        sx={{ color: '#0c7078', scale: 2 }}
        aria-label="Email"
        >
        <EmailIcon />
        </IconButton>
        <Typography variant="body1" sx={{ fontSize: 14, color: '#0f969c' }}>
          danielhed33@gmail.com
        </Typography>
        </Container>
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}> 
        <IconButton
          aria-label="Adress"
          sx={{ color: '#0c7078', scale: 2, py: 2 }}
          >
          <PinDropIcon />
        </IconButton>
        <Typography variant="body1" sx={{ fontSize: 14, color: '#0f969c' }}>
          Växjö / Stockholm, Sweden
        </Typography>
        </Container>
        </Box>
        </Box>
        </Container>
        </Box>
    </section>
  );
};

export default About;
