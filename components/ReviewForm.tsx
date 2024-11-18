// components/ReviewForm.tsx
import React, { useState } from 'react';

const ReviewForm: React.FC<{ onSubmit: (review: string) => void }> = ({ onSubmit }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(review);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;