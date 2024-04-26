import React, { useState } from 'react';
import bird from '../assets/projects/bird-logo.png';
import bowser from '../assets/projects/bowser.png';
import drake from '../assets/projects/drake.png';
import koala from '../assets/projects/vector-koala-dh.png';
import portrait from '../assets/projects/vectorprofilepic.png/';
import county from '../assets/projects/county.png';
import goldenshine from '../assets/projects/goldenshine.png';
import tentcamping from '../assets/projects/tent-camping.png';
import swish_aretskortcontest from '../assets/projects/swish-aretskortcontest.png';
import alpo from '../assets/projects/alpo-mountains.png';
import oppenheimer_poster from '../assets/projects/oppenheimer-poster.png';
import turqoisespacecar from '../assets/projects/turqoisespacecar.png';
import sthlm_text from '../assets/projects/sthlm-text.png';
import circles_poster from '../assets/projects/circles-poster.png';
import phonkbeat1 from '../assets/projects/phonkbeat1.png';
import vorbis from '../assets/projects/vorbis-background.jpg';
import Snapshot1 from '../assets/projects/Snapshot1.jpg';
import Snapshot2 from '../assets/projects/Snapshot2.jpg';
import Snapshot3 from '../assets/projects/Snapshot3.jpg';
import Snapshot4 from '../assets/projects/Snapshot4.jpg';
import Snapshot6 from '../assets/projects/Snapshot6.jpg';
import Snapshot7 from '../assets/projects/Snapshot7.jpg';
import Snapshot8 from '../assets/projects/Snapshot8.jpg';
import Snapshot9 from '../assets/projects/Snapshot9.jpg';
import Snapshot10 from '../assets/projects/Snapshot10.jpg';
import Snapshot11 from '../assets/projects/Snapshot11.jpg';
import pirateEscape from '../assets/projects/pirateescape-header.png';
import footyStats from '../assets/projects/footystats-header.png';
import flutterWeatherApp from '../assets/projects/FlutterWeatherApp.png';
import { Typography, Box, ImageList, ImageListItem, Modal } from '@mui/material';


const illustratorProjects = [
    bowser,
    bird,
    drake,
    county,
    goldenshine,
    tentcamping,
    swish_aretskortcontest,
    portrait,
    alpo
];


const photoshopProjects = [
    oppenheimer_poster,
    turqoisespacecar,
    sthlm_text,
    circles_poster,
    phonkbeat1,
    vorbis
];

const modellingProjects = [
    Snapshot1,
    Snapshot2,
    Snapshot3,
    Snapshot4,
    Snapshot6,
    Snapshot7,
    Snapshot8,
    Snapshot9,
    Snapshot10,
    Snapshot11
];

const arcadeGame = [
    'https://github.com/dahe3320/PirateEscape'
];

const footyApp = [
    'https://github.com/dahe3320/FootyStats'
];

const weatherApp = [
    'https://github.com/dahe3320/WeatherAppFlutter'
];



const Gallery = () => {
    const [activeGallery, setActiveGallery] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const projectGalleries = [
      {
          projects: illustratorProjects,
          placeholder: illustratorProjects[0], // Assuming the first item is the placeholder
          name: 'Illustrator Gallery',
          description: 'Samling av olika gjorda vectorbilder etc.'
      },
      {
          projects: photoshopProjects,
          placeholder: photoshopProjects[0], // Assuming the first item is the placeholder
          name: 'Photoshop Gallery',
          description: 'Samling av utförda bildredigeringar'
      },
      {
          projects: modellingProjects,
          placeholder: modellingProjects[0], // Assuming the first item is the placeholder
          name: 'Modelling Gallery',
          description: 'Samling av olika 3D-modellerade projekt'
      },
      {
          projects: arcadeGame,
          placeholder: pirateEscape,
          name: 'Pirate Escape',
          description: 'Ett spelprojekt som jag har skapat i Projektkurs'
      },
      {
          projects: footyApp,
          placeholder: footyStats,
          name: 'Footy Stats',
          description: 'En webbapplikation som jag har skapat i Webbutvecklingskurs'
      },
      {
        projects: weatherApp,
        placeholder: flutterWeatherApp,
        name: 'Weather App with Flutter',
        description: 'En väderapplikation som jag har skapat med Flutter'
      }
  ];
  const handleGalleryItemOnClick = (gallery) => {
    // Check if the clicked gallery's projects array contains URLs
    // and open the first URL in a new window (for arcadeGame or footyApp)
    if (gallery.projects === arcadeGame || gallery.projects === footyApp || gallery.projects === weatherApp) {
        window.open(gallery.projects[0], '_blank');
    } else {
        setActiveGallery(gallery.projects);
    }
};

const handleOpenImage = (imageSrc) => {
  setSelectedImage(imageSrc);
  setOpen(true);
};

    return (
        <Box className="gallery-container">
          <Typography variant="h4" gutterBottom>
            <Box component="span" sx={{ display: 'block', fontWeight: 'fontWeightMedium', py: 2, fontFamily: 'Orbitron, sans-serif !important'}}>Mina Projekt</Box>
            <Box component="span" sx={{ display: 'block', fontWeight: 'fontWeightRegular', fontSize: '20px', py: 1 }}>
              Detta projektgalleri består av olika projekt som har skapats av mig under min studeringsperiod och projekt som jag har gjort på sidan av på min fritid.
            </Box>
          </Typography>

          <Box className='gallery-wrapper' sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {projectGalleries.map((gallery, index) => (
              <figure key={index} className='gallery-item' onClick={() => handleGalleryItemOnClick(gallery)}>
                <img src={gallery.placeholder} alt={gallery.name} style={{ 
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: -1,
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' }} 
                    />
                <Box component="figcaption" className='item-desc' sx={{ 
                    alignSelf: 'flex-end',
                    textTransform: 'uppercase',
                    color: '#06060c'
                 }}>
                  <Typography variant="h6" className='name' sx={{ 
                    fontFamily: 'Orbitron, sans-serif !important',
                    backgroundColor: '#c5c5c5',
                    padding: '10px',
                    transform: 'translateY(-10px)'
                   }}>{gallery.name}</Typography>
                  <Typography className='desc' sx={{ 
                    display: 'inline-block',
                    backgroundColor: '#4a3661',
                    color: '#c5c5c5',
                    fontWeight: 'bold',
                    boxShadow: '0 1px 10px rgba(0, 0, 0, 0.8)',
                    transform: 'translateY(-10px)',
                    padding: '10px',
                   }}>{gallery.description}</Typography>
                </Box>
              </figure>
            ))}
          </Box>
          <ImageList sx={{ width: '100%', height: 'auto', py: 4 }} cols={3} gap={8}>
            {activeGallery.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={`${image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={`Project ${index + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer'}}
                  onClick={() => handleOpenImage(image)}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-figure">
            <img src={selectedImage} alt="Enlarged project" style={{ width: '100%', height: 'auto'}} />
            </Box>
          </Modal>
        </Box>
    );
}
    
export default Gallery;