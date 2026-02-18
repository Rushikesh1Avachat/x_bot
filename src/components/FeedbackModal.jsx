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
import { useState, useEffect } from "react";

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [subjective, setSubjective] = useState("");

  useEffect(() => {
    if (!open) {
      setRating(0);
      setSubjective("");
    }
  }, [open]);

  const handleSubmit = () => {
    onSubmit({ rating, subjective });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Provide Additional Feedback</DialogTitle>

      <DialogContent>
        <Box mb={2}>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Write your feedback..."
          value={subjective}
          onChange={(e) => setSubjective(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#D7C7F4", color: "#000" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;



