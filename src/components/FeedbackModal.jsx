// src/components/FeedbackModal.jsx
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Rating, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSave = () => {
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 400, bgcolor: '#FAF7FF', p: 3, borderRadius: 4, boxShadow: 24
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LightbulbOutlinedIcon fontSize="small" />
            <Typography variant="h6" sx={{ fontFamily: 'Ubuntu' }}>Provide Additional Feedback</Typography>
          </Stack>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
        <Rating value={rating} onChange={(e, val) => setRating(val)} sx={{ mb: 2 }} />
        <TextField fullWidth multiline rows={4} placeholder="Write your feedback..." value={comment} onChange={(e) => setComment(e.target.value)} sx={{ bgcolor: 'white' }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Submit</Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default FeedbackModal;

