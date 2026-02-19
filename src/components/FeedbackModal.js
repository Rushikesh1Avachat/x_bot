import { useState } from "react";

function FeedbackModal({ close }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const submitFeedback = () => {
    const feedbacks = JSON.parse(localStorage.getItem("feedback")) || [];
    feedbacks.push({ rating, text });
    localStorage.setItem("feedback", JSON.stringify(feedbacks));
    close(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Provide Additional Feedback</h3>

        <div className="stars">
          {[1,2,3,4,5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              className={rating >= num ? "active" : ""}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={submitFeedback}>Submit</button>
      </div>
    </div>
  );
}

export default FeedbackModal;
