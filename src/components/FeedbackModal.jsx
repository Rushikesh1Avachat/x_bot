import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Rating, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { TbBulb } from 'react-icons/tb';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, text: feedback });
    setRating(0);
    setFeedback("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 400, bgcolor: '#FAF9FF', borderRadius: '15px', p: 4, boxShadow: 24
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <TbBulb size={24} color="#9747FF" />
            <Typography variant="h6">Provide Additional Feedback</Typography>
          </Box>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        <Rating 
          value={rating} 
          onChange={(event, newValue) => setRating(newValue)} 
          sx={{ mb: 2 }} 
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ bgcolor: 'white', mb: 3 }}
        />

        <Box display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ bgcolor: '#D7C7F4', color: 'black', textTransform: 'none' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;