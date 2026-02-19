import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    // Reset state for the next conversation
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 4, p: 2, width: '400px' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 3, pt: 2 }}>
        <LightbulbIcon sx={{ color: '#FFD700', mr: 1 }} />
        <Typography variant="h6">Provide Feedback</Typography>
      </Box>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Rating
            size="large"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </Box>
        
        <TextField
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like or dislike about this chat?"
          variant="outlined"
          sx={{ 
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!rating} // Prevents empty ratings
            sx={{ 
              bgcolor: '#D7C7EB', 
              color: 'black',
              '&:hover': { bgcolor: '#c2b0e0' },
              textTransform: 'none',
              fontWeight: 'bold',
              px: 4
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
