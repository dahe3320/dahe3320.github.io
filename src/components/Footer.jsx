import React from "react";
import { Typography, Box, Link } from '@mui/material';
import '../index.css' // Adjust the path as necessary

export default function Footer () {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed', // or 'absolute' for relative positioning to the nearest positioned ancestor
        bottom: 0,
        left: 0,
        zIndex: 3,
        width: '100%',
        height: '5%',
        backgroundColor: '#292033', // Example background color, adjust as needed
        color: '#c5c5c5', // Example text color, adjust as needed
        textAlign: 'center', // Centers the content

      }}
    >
      <Box
        className="contact-info"
        sx={{
          '& ul': {
            listStyle: 'none', // Removes bullet points from the list
            padding: 0, // Removes default padding
            '& li': {
              display: 'inline-block', // Displays list items inline
              marginRight: 2, // Adds spacing between list items
            },
          },
        }}
      >
        <ul>
          <li>
            E-post: <Link sx={{textDecoration: 'none', color: 'inherit' }} href="mailto:danielhed33@gmail.com">danielhed33@gmail.com</Link>
          </li>
          <li>
            Telefon: <Link sx={{textDecoration: 'none', color: 'inherit' }} href="tel:+46707742426">+46 70 774 24 26</Link>
          </li>
        </ul>
      </Box>
      <Typography variant="body2">
        &copy; 2023 Daniel Hed. Alla rättigheter förbehållna.
      </Typography>
    </Box>
  );
}