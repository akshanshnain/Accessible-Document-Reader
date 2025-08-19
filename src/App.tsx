import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import DocumentReader from './components/DocumentReader/index.tsx'; // Remove .tsx extension

// Create accessibility-first theme with high contrast support
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Accessibility Blue
    },
    secondary: {
      main: '#dc004e', // Accent Red
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    // High contrast support
    contrastThreshold: 4.5, // WCAG AA standard
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 48, // WCAG touch target size
          padding: '12px 24px',
          '&:focus': {
            outline: '2px solid #1976d2',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:focus-within': {
              outline: '2px solid #1976d2',
              outlineOffset: '2px',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    // Ensure focus indicators are visible
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: '2px solid #1976d2',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box 
          component="main"
          sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            // Ensure proper focus management
            '& *:focus': {
              outline: '2px solid #1976d2',
              outlineOffset: '2px',
            },
          }}
          role="main"
          aria-label="Accessible Document Reader Application"
        >
          <Routes>
            <Route path="/" element={<DocumentReader />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
