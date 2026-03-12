import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import RefreshIcon from '@mui/icons-material/Refresh';

const MacWindow = ({ title = 'terminal', url = '', showUrlBar = false, children, sx = {} }) => {
  const [urlValue, setUrlValue] = useState(url);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(15, 150, 156, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        ...sx,
      }}
    >
      {/* ── Title bar ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 1, sm: 2 },
          px: 1.5,
          py: 1,
          background: 'linear-gradient(180deg, #1a3a40 0%, #0e2a2f 100%)',
          borderBottom: showUrlBar ? 'none' : '1px solid rgba(15, 150, 156, 0.2)',
          userSelect: 'none',
        }}
      >
        {/* Traffic lights */}
        <Box sx={{ display: 'flex', gap: '6px', mr: { xs: 0, sm: 1.5 }, flexShrink: 0, justifyContent: 'flex-start'}}>
          <Box
            sx={{
              width: { xs: 10, sm: 14 }, height: { xs: 10, sm: 14 }, borderRadius: '50%',
              bgcolor: '#ff5f57', border: '1px solid #e0443e',
              transition: 'all 0.2s ease',
              '&:hover': { filter: 'brightness(1.2)', transform: 'scale(1.15)' },
            }}
          />
          <Box
            sx={{
              width: { xs: 10, sm: 14 }, height: { xs: 10, sm: 14 }, borderRadius: '50%',
              bgcolor: '#febc2e', border: '1px solid #d4a028',
              transition: 'all 0.2s ease',
              '&:hover': { filter: 'brightness(1.2)', transform: 'scale(1.15)' },
            }}
          />
          <Box
            sx={{
              width: { xs: 10, sm: 14 }, height: { xs: 10, sm: 14 }, borderRadius: '50%',
              bgcolor: '#28c840', border: '1px solid #1aab29',
              transition: 'all 0.2s ease',
              '&:hover': { filter: 'brightness(1.2)', transform: 'scale(1.15)' },
            }}
          />
        </Box>

        {/* Title or URL bar */}
        {showUrlBar ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: isFocused ? 'rgba(5, 22, 26, 0.9)' : 'rgba(5, 22, 26, 0.6)',
              border: isFocused
                ? '1px solid rgba(15, 150, 156, 0.5)'
                : '1px solid rgba(15, 150, 156, 0.15)',
              borderRadius: '8px',
              px: 1.5,
              py: 0.5,
              transition: 'all 0.3s ease',
              mx: { xs: 0, sm: 2, md: 4 },
              boxShadow: isFocused ? '0 0 12px rgba(15, 150, 156, 0.15)' : 'none',
            }}
          >
            <LockIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: 'rgba(15, 150, 156, 0.5)', flexShrink: 0 }} />
            <input
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              spellCheck={false}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'rgba(109, 165, 192, 0.8)',
                fontFamily: '"Kode Mono", monospace',
                fontSize: '0.85rem',
                letterSpacing: '0.02em',
                caretColor: '#0f969c',
                minWidth: 0,
              }}
            />
            <RefreshIcon
              sx={{
                fontSize: { xs: 12, sm: 14 },
                color: 'rgba(15, 150, 156, 0.4)',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#0f969c',
                  transform: 'rotate(180deg)',
                },
              }}
            />
          </Box>
        ) : (
          <Typography
            sx={{
              flex: 1,
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'rgba(109, 165, 192, 0.7)',
              fontFamily: '"Kode Mono", monospace',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </Typography>
        )}

        {/* Spacer to balance traffic lights - hidden on mobile */}
        <Box sx={{ width: 54, flexShrink: 0, display: { xs: 'none', sm: 'block' } }} />
      </Box>

      {/* ── Optional second bar for tab/title when URL bar is shown ── */}
      {showUrlBar && title && (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            background: 'linear-gradient(180deg, #0e2a2f 0%, rgba(5, 22, 26, 0.95) 100%)',
            borderBottom: '1px solid rgba(15, 150, 156, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {/* Active tab */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.8,
              px: 1.5,
              py: 0.4,
              bgcolor: 'rgba(15, 150, 156, 0.08)',
              border: '1px solid rgba(15, 150, 156, 0.15)',
              borderBottom: 'none',
              borderRadius: '6px 6px 0 0',
              maxWidth: 200,
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0f969c', flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: '0.9rem',
                color: 'rgba(109, 165, 192, 0.8)',
                fontFamily: '"Kode Mono", monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      )}

      {/* ── Content ── */}
      <Box
        sx={{
          bgcolor: 'rgba(5, 22, 26, 0.95)',
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MacWindow;