import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import projects from "../data/projects.json";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  // Auto-slide every 2 seconds
  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(autoSlide); // Clear interval on component unmount
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

  return (
    <Box
      sx={{
        padding: 12,
        width: "100%",
        position: "relative",
        perspective: 1200, // Depth effect
        overflow: "hidden",
      }}
      {...swipeHandlers}
    >
      <Typography 
        variant="h6" 
        sx={{ textAlign: 'center' }} 
        gutterBottom
        >
        My Work
      </Typography>
      <Typography
        variant="h3"
        component="h3"
        gutterBottom
        sx={{ textAlign: "center", pb: 5}}
      >
        Projects
      </Typography>
      <Box
        sx={{
          position: "relative",
          height: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {projects.map((project, index) => {
          // Calculate the relative distance from the currentIndex (center card)
          const distance = (index - currentIndex + projects.length) % projects.length;

          // Define the transforms for the cards based on their distance from the center
          let transform = "";
          if (distance === 0) {
            transform = "translateX(0) scale(1) translateZ(0)"; // Center card
          } else if (distance === 1 || distance === -projects.length + 1) {
            transform = "translateX(420px) scale(0.85) translateZ(-100px)"; // Right card
          } else if (distance === -1 || distance === projects.length - 1) {
            transform = "translateX(-420px) scale(0.85) translateZ(-100px)"; // Left card
          } else {
            transform = "translateX(0) scale(0) translateZ(-400px)"; // Hidden cards
          }

          const opacity = distance === 0 ? 1 : 0.8; // Keep the center card fully visible
          const zIndex = distance === 0 ? 10 : 5; // Bring center card to the front

          return (
            <Box
              key={project.id}
              sx={{
                position: "absolute",
                width: 400,
                height: 500,
                border: "1px solid #0f969c",
                borderRadius: 2,
                boxShadow: "0 10px 20px rgba(15, 150, 156, 0.2)",
                overflow: "hidden",
                cursor: "pointer",
                transform,
                opacity,
                zIndex,
                transition: "transform 0.5s ease, opacity 0.5s ease, z-index 0.5s ease",
                backgroundColor: "#6da5c0",
                "&:hover": { opacity: 0.7 },
              }}
              onClick={() => handleProjectClick(project.id)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "#072E33",
                  color: "#6da5c0",
                  fontSize: 20,
                  textAlign: "center",
                  padding: "15px 32px 0 32px",
                }}
              >
                {project.title}
                <br />
                {project.technologies.map((tech) => (
                  <Box
                    key={tech}
                    sx={{
                      display: "inline-block",
                      padding: "20px 4px 0 4px",
                      margin: "10px 4px",
                      borderRadius: 4,
                    }}
                  >
                    <img src={tech} alt={tech} style={{ width: 30, height: 30, marginRight: 4 }} />
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
        {/* Navigation Buttons */}
        <IconButton
          sx={{
            position: "absolute",
            left: "15%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: "#0f969c",
            scale: 1.5,
            "&:hover": { bgcolor: "#072E33" },
          }}
          onClick={handlePrev}
        >
          <ArrowBack sx={{ color: "#05161A" }} />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            right: "15%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: "#0f969c",
            scale: 1.5,
            "&:hover": { bgcolor: "#072E33" },
          }}
          onClick={handleNext}
        >
          <ArrowForward sx={{ color: "#05161A" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Gallery;
