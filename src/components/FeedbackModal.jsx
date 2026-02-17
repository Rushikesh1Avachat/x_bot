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
        sx: { borderRadius: '15px', p: 1 } // Rounded corners as per image
      }}
    >
      {/* Header Area */}
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LightbulbOutlined sx={{ fontSize: 28 }} /> 
          <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
            Provide Additional Feedback
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            sx={{ 
              mt: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              type="submit"
              variant="contained" 
              sx={{ 
                bgcolor: '#D7C7F4', // Light purple from your images
                color: 'black',
                textTransform: 'none',
                px: 4,
                borderRadius: '8px',
                '&:hover': { bgcolor: '#9747FF', color: 'white' } 
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