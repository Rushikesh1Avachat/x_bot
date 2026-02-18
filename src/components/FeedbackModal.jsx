import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); // Changed key name for clarity

  const handleSubmit = () => {
    // This object structure must match what HistoryPage expects
    onSubmit({ rating, comment }); 
    setRating(0);
    setComment("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Ubuntu' }}>
        <LightbulbOutlinedIcon /> Provide Additional Feedback
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            size="large"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            placeholder="Write your feedback here..."
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff',
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary', textTransform: 'none' }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ 
            bgcolor: '#D7C7F4', 
            color: '#000', 
            '&:hover': { bgcolor: '#BFABE2' },
            textTransform: 'none'
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;





