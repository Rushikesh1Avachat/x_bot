import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
    setRating(0);
    setFeedback("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Give Feedback</DialogTitle>

      <DialogContent>
        <Typography mb={2}>
          Rate your conversation
        </Typography>

        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
        />

        <TextField
          fullWidth
          label="Subjective Feedback"
          multiline
          rows={3}
          sx={{ mt: 2 }}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;





