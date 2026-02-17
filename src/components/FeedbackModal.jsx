import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Rating 
} from '@mui/material';
import { MdOutlineFeedback } from 'react-icons/md';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    onSubmit({ rating, feedbackText });
    setRating(0);
    setFeedbackText('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MdOutlineFeedback size={24} color="#9747FF" />
        <Typography variant="h6">Provide Additional Feedback</Typography>
      </DialogTitle>
      
      <DialogContent divider>
        <Box sx={{ my: 2, textAlign: 'center' }}>
          <Typography gutterBottom>How would you rate this conversation?</Typography>
          <Rating 
            value={rating} 
            onChange={(event, newValue) => setRating(newValue)} 
            size="large"
          />
        </Box>
        
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Share your thoughts here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          sx={{ bgcolor: '#9747FF', '&:hover': { bgcolor: '#7B39D1' } }}
        >
          Submit Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;