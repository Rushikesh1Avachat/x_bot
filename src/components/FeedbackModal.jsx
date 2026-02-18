import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSave = () => {
    // Submit the comment back to ChatPage
    onSubmit({ comment }); 
    setComment("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
          bgcolor: "#FAF7FF", // Figma background color
          p: 3,
          borderRadius: 4,
          boxShadow: 24,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LightbulbOutlinedIcon />
            <Typography variant="h6" sx={{ fontFamily: 'Ubuntu' }}>
              Provide Additional Feedback
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ 
            bgcolor: "white",
            '& .MuiOutlinedInput-root': { borderRadius: 2 }
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ 
              bgcolor: "#D7C7F4", 
              color: "black",
              textTransform: 'none',
              px: 4,
              '&:hover': { bgcolor: '#af9cf3' }
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;

