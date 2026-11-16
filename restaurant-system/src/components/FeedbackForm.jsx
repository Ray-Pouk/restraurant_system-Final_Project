import { useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";

// Customer rates an order. One feedback entry per order.
function FeedbackForm({ order }) {
  const { feedback, addFeedback } = useRestaurant();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const existing = feedback.find((f) => f.orderNumber === order.orderNumber);

  if (existing) {
    return (
      <div role="status">
        <h3>Thanks for your feedback!</h3>
        <p>You rated this order {existing.rating}/5.</p>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    addFeedback({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      userId: order.userId ?? null,
      rating,
      comment: comment.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>How was your order?</h3>

      <label>Rating: </label>
      <select
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
      >
        <option value={5}>5 - Excellent</option>
        <option value={4}>4 - Good</option>
        <option value={3}>3 - Okay</option>
        <option value={2}>2 - Poor</option>
        <option value={1}>1 - Terrible</option>
      </select>

      <textarea
        placeholder="Tell us more (optional)"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        rows={3}
      />

      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm;
