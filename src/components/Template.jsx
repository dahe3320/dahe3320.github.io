import React, { useState, useEffect } from "react";
import '../index.css' // Adjust the path as necessary
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Hero from "./Hero";
import About from "./About";
import Gallery from "./Gallery";

export default function Template() {
    const [alignment, setAlignment] = useState("left");
    const [scrollLocked, setScrollLocked] = useState(false);

    const handleClick = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const renderComponent = () => {
        let component;
        switch (alignment) {
            case "left":
                component = <Hero />;
                break;
            case "center":
                component = <About />;
                break;
            case "right":
                component = <Gallery />;
                break;
            default:
                component = null;
        }
        return (
        <CSSTransition
            key={alignment}
            timeout={800} // Animation duration
            classNames="page"
            unmountOnExit
        >
        <div className="page">
            <div className="page-fit">
                {component}
            </div>
        </div>
        </CSSTransition>
        );
    };
    

    return (
        <>
        <Box sx={{
            position: 'fixed',
            bottom: '4%', // Example: Adjust position differently on smaller screens
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: '100%', // More width on smaller screens, less on larger
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#292033',
            padding: { xs: '15px', sm: '20px', md: '30px' }, // Less padding on smaller screens
            boxShadow: 3,
            overflow: 'visible',
            whiteSpace: 'nowrap',
        }}>
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleClick}
            aria-label="text alignment"
            sx={{
                // Ensure the button group is centered and responsive
                display: 'flex',
                '& .MuiToggleButton-root': {
                    position: 'relative',
                    width: 'auto', // Full width on xs screens, auto width on larger screens
                    bgcolor: '#4a3661',
                    color: '#f4f4f4',
                    fontSize: {md: '1.5rem', lg: '1rem'}, // Smaller font size on xs screens, increasing with screen size
                    padding: '10px 25px 10px 25px', // Adjust padding based on screen size
                    margin: 2,
                    borderRadius: 15,
                    '&:hover': {
                        color: '#f4f4f4',
                        bgcolor: '#7B6099',
                    },
                    '&:not(:last-of-type)': { 
                        mr: { xs: 0, sm: 2 } // Adds right margin to all buttons except the last one on sm screens and up
                    },
                },
                '& .Mui-selected, & .Mui-selected:hover': {
                    bgcolor: '#7B6099',
                },
            }}
        >
            <ToggleButton value="left" aria-label="left aligned">Start</ToggleButton>
            <ToggleButton value="center" aria-label="centered">Kompetens</ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">Projekt</ToggleButton>
        </ToggleButtonGroup>
        </Box>
            <TransitionGroup>
                {renderComponent()}
            </TransitionGroup>
        </>
    );
    }