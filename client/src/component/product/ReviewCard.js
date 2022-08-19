import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../assets/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    precision: 0.5,
    isHalf: true,
    size: 20,
    edit: false,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars value={review.rating} {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
