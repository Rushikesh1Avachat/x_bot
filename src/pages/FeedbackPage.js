import { useState } from "react";

function FeedbackPage() {
  const [filter, setFilter] = useState(0);
  const feedbacks = JSON.parse(localStorage.getItem("feedback")) || [];

  const filtered =
    filter === 0
      ? feedbacks
      : feedbacks.filter((f) => f.rating === filter);

  return (
    <div>
      <h2>All Feedback</h2>

      <select onChange={(e) => setFilter(Number(e.target.value))}>
        <option value="0">All</option>
        {[1,2,3,4,5].map((n) => (
          <option key={n} value={n}>{n} Stars</option>
        ))}
      </select>

      {filtered.map((f, i) => (
        <div key={i}>
          ⭐ {f.rating} - {f.text}
        </div>
      ))}
    </div>
  );
}

export default FeedbackPage;
