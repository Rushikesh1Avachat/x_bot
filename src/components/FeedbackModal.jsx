import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CloseIcon from '@mui/icons-material/Close';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    if (feedbackText.trim()) {
      onSubmit(feedbackText);
      setFeedbackText('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '15px', p: 1 } }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <LightbulbOutlinedIcon sx={{ fontSize: 28 }} />
        <Typography sx={{ flexGrow: 1, fontSize: '1.1rem' }}>Provide Additional Feedback</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth multiline rows={6}
          variant="outlined"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ bgcolor: '#D7C7F4', color: 'black', textTransform: 'none', px: 4, '&:hover': { bgcolor: '#c5b2ea' } }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;