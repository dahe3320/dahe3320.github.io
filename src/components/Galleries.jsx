import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects.json'; // Import your JSON file
import { Container, Grid, Typography, Button, Box, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Field from './Field';

const Galleries = () => {
  const { id } = useParams(); // Retrieve the project ID from the URL
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the project by ID from the JSON data
    const selectedProject = projects.find((project) => project.id === id);
    setProject(selectedProject);
  }, [id]);

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the home page (Gallery)
  };

  if (!project) {
    return <div>Loading...</div>; // Show loading state if the project is not found yet
  }

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <Field />
    <Container sx={{ mt: 8, zIndex: 1, color: '#f0f0f0' }}>
      {/* Back Button */}
      <IconButton 
        aria-label="Back" 
        onClick={handleBackClick}
        sx={{ color: '#0f969c', marginBottom: 8, border: '2px solid #0f969c', borderRadius: 2, px: 2, '&:hover': { bgcolor: '#0f969c', color: '#072E33' } }}
      >
        <ChevronLeftIcon sx={{ marginRight: 1 }} /> Back
      </IconButton>
      <Box>
      {/* Project Title and Description */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {project.title}
      </Typography>
      <Typography variant="h6" component="p" sx={{ textAlign: 'center', marginBottom: 3 }}>
        {project.description}
      </Typography>

      {/* Images Grid */}
      <Grid container spacing={4} justifyContent="center">
        {project.images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', backgroundColor: '#0c7078' }}>
              <CardMedia
                component="img"
                image={image}
                alt={`${project.title} - ${index + 1}`}
                sx={{ height: 300, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
        
      {/* Project Details Section */}
      <Box sx={{ my: 8, backgroundColor: '#072E33', padding: 4, border: '2px solid #0f969c', borderRadius: 2, height: '30vh' }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Project Details
        </Typography>
        <Typography variant="body1" sx={{ paddingBottom: 4 }}>
          {project.details}
          </Typography>
          <Typography variant="body1" sx={{ paddingBottom: 2 }}>
          <a href={project.link} target="_blank" rel="noreferrer" style={{ color: '#6da5c0', textDecoration: 'none', fontSize: '18px' }}>Link to Github Repo</a>
        </Typography>
          {project.technologies.map((tech) => (
            <Box
              key={tech}
              sx={{
                display: "inline-block",
                margin: "10px 4px",
                borderRadius: 4,
              }}
            >
              <img src={tech} alt={tech} style={{ width: 50, height: 50, marginRight: 4 }} />
            </Box>
          ))}
      </Box>
      </Box>
    </Container>
    </section>
  );
};

export default Galleries;
