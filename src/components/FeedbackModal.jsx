import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton
} from '@mui/material';
import { LightbulbOutlined, Close } from '@mui/icons-material';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return; // Don't submit empty strings
    onSubmit(feedbackText);
    setFeedbackText('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: { 
          borderRadius: '20px', // Exact rounded corners from Figma
          p: 2,
          background: '#FAF7FF' // Slight off-white/lavender tint
        } 
      }}
    >
      {/* Header Area */}
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LightbulbOutlined sx={{ fontSize: 24, color: '#000' }} /> 
          <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 400, color: '#000' }}>
            Provide Additional Feedback
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#000' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            // Requirement: Ensure high contrast for readability
            sx={{ 
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                bgcolor: '#fff'
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              type="submit" // Requirement: Must be submit type
              variant="contained" 
              sx={{ 
                bgcolor: '#D7C7F4', // Specific theme color
                color: '#000',
                textTransform: 'none',
                fontWeight: 500,
                px: 5,
                py: 1,
                borderRadius: '10px',
                '&:hover': { bgcolor: '#AF94E8' } 
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;