// src/components/Layout.jsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Layout({ children, currentView, onViewChange }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9F9FB' }}> {/* matches your light background */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: '#9747FF', // your primary purple
          boxShadow: '0 2px 10px rgba(151,71,255,0.2)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600,
              fontFamily: '"Ubuntu", sans-serif',
            }}
          >
            Bot AI
          </Typography>

          <Button
            color="inherit"
            variant={currentView === 'chat' ? 'outlined' : 'text'}
            onClick={() => onViewChange('chat')}
            sx={{ 
              mr: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: currentView === 'chat' ? 'white' : 'transparent',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            New Chat
          </Button>

          <Button
            color="inherit"
            variant={currentView === 'history' ? 'outlined' : 'text'}
            onClick={() => onViewChange('history')}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: currentView === 'history' ? 'white' : 'transparent',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Past Conversations
          </Button>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="md" 
        sx={{ 
          py: { xs: 2, sm: 4 },
          px: { xs: 1.5, sm: 3 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
}