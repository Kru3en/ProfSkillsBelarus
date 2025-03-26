import React from "react";

interface RatingProps {
  value: number;
}

export const Rating: React.FC<RatingProps> = ({ value }) => {
  return <p className="text-yellow-500">Рейтинг: {value} / 5</p>;
};