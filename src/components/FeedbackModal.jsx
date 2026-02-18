import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
} from "@mui/material";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <LightbulbOutlinedIcon color="primary" />
        Provide Additional Feedback
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 1 }}>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            size="large"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your feedback here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={rating === 0}
          sx={{ bgcolor: '#D7C7F4', color: '#000' }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;