import React, { useState, useEffect } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';

const actions = [
  {
    icon: <GitHubIcon />,
    name: 'GitHub',
    href: 'https://github.com/dahe3320',
    hoverColor: '#2dba4e',
  },
  {
    icon: <LinkedInIcon />,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/daniel-hed-232536263/',
    hoverColor: '#0a66c2',
  },
  {
    icon: <MailIcon />,
    name: 'Email',
    href: 'mailto:danielhed33@gmail.com',
    hoverColor: '#fa76e2',
  },
  {
    icon: <DownloadIcon />,
    name: 'Download CV',
    href: '/assets/images/CV-english_danhed1.pdf',
    download: true,
    hoverColor: '#0f969c',
  },
];

const SocialSpeedDial = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling 60% of viewport height
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <SpeedDial
      ariaLabel="Social links"
      sx={{
        position: 'fixed',
        bottom: 90,
        left: 24,
        zIndex: 9990,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        '& .MuiFab-primary': {
          bgcolor: 'rgba(5, 22, 26, 0.85)',
          border: '2px solid #0f969c',
          backdropFilter: 'blur(8px)',
          color: '#0f969c',
          width: 48,
          height: 48,
          '&:hover': {
            bgcolor: 'rgba(15, 150, 156, 0.2)',
          },
        },
      }}
      icon={<SpeedDialIcon icon={<ShareIcon />} openIcon={<CloseIcon />} />}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipPlacement="right"
          component="a"
          href={action.href}
          target={action.download ? '_self' : '_blank'}
          rel="noopener noreferrer"
          download={action.download || undefined}
          sx={{
            bgcolor: 'rgba(5, 22, 26, 0.9)',
            border: '1px solid rgba(15, 150, 156, 0.3)',
            color: '#6da5c0',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              bgcolor: 'rgba(5, 22, 26, 1)',
              color: action.hoverColor,
              borderColor: action.hoverColor,
              boxShadow: `0 0 15px ${action.hoverColor}40`,
            },
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default SocialSpeedDial;