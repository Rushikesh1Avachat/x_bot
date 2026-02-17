import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton,
  Rating // Added for the 5-star requirement
} from '@mui/material';
import { LightbulbOutlined, Close } from '@mui/icons-material';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0); // State for the 5-star rating

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass both rating and text back to the parent
    onSubmit({ text: feedbackText, rating: rating });
    setFeedbackText('');
    setRating(0);
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
          borderRadius: '20px', 
          p: 2,
          background: '#FAF7FF' 
        } 
      }}
    >
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
          {/* Requirement: Rating out of 5 */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">Rate this response:</Typography>
            <Rating 
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Describe your experience..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                bgcolor: '#fff'
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                bgcolor: '#D7C7F4', 
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