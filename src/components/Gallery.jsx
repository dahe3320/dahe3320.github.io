import React from "react";
import { useNavigate } from "react-router";
import projects from "../data/projects.json";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ScrollReveal from './ScrollReveal';
import MacWindow from "./MacWindow";

const Gallery = () => {
  const navigate = useNavigate();

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <Box
      id="projects"
      sx={{
        px: { xs: 2, sm: 4, md: 8, lg: 12 },
        py: { xs: 4, md: 8, lg: 12 },
        width: "100%",
        maxWidth: 1800,
        margin: "0 auto",
      }}
    >
      <ScrollReveal variant="fade-up" duration={900}>
        <Typography 
          variant="h6" 
          sx={{ textAlign: 'center', color: '#0f969c', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem' }} 
          gutterBottom
        >
          My Work
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", pb: 6 }}
        >
          Projects
        </Typography>
      </ScrollReveal>

      <MacWindow 
        title="projects.jsx" 
        showUrlBar
        url="my-portfolio/projects"
        sx={{ mb: 4, gridColumn: '1 / -1' }}
      >
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
            <ScrollReveal variant="fade-up" delay={project.id * 100} duration={700} threshold={0.05} style={{ height: '100%' }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.4s ease",
                backgroundColor: "#072E33",
                border: "1px solid rgba(15, 150, 156, 0.3)",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(15, 150, 156, 0.3)",
                  borderColor: "#6da5c0",
                },
                "&:hover .card-image": {
                  transform: "scale(1.05)",
                },
                "&:hover .card-overlay": {
                  opacity: 0.7,
                },
              }}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* ── Image container with gradient fade ── */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 280,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  className="card-image"
                  src={project.headerImage}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                />
                {/* Gradient overlay — fades image into card bg */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(to top, #072E33 0%, rgba(7, 46, 51, 0.6) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Hover tint overlay */}
                <Box
                  className="card-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(15, 150, 156, 0.1) 0%, rgba(7, 46, 51, 0.3) 100%)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none",
                  }}
                />
              </Box>

              {/* ── Content overlaps image via negative margin ── */}
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 1,
                  mt: -6,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  px: 2.5,
                  pb: 2.5,
                  pt: 0,
                  backgroundColor: "transparent",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: "#f0f0f0",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(15, 150, 156, 1)",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  {project.shortDescription}
                </Typography>
                
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: "auto",
                    pt: 1,
                  }}
                >
                  {project.technologies.length > 0 &&
                    project.technologies.slice(0, 4).map((tech, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(15, 150, 156, 0.1)",
                        border: "1px solid rgba(15, 150, 156, 0.15)",
                        borderRadius: "6px",
                        padding: "4px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "rgba(15, 150, 156, 0.4)",
                          backgroundColor: "rgba(15, 150, 156, 0.15)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <img
                        src={tech}
                        alt="technology"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  ))}
                  {project.technologies.length > 4 && (
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(15, 150, 156, 0.1)",
                        border: "1px solid rgba(15, 150, 156, 0.15)",
                        borderRadius: "6px",
                        fontSize: "0.65rem",
                        color: "#6da5c0",
                        fontFamily: '"Kode Mono", monospace',
                      }}
                    >
                      +{project.technologies.length - 4}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
            </ScrollReveal>
          </Grid>
        ))}
      </Grid>
      </MacWindow>
    </Box>
  );
};

export default Gallery;