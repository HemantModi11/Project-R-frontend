'use client';

import { Star } from 'lucide-react';

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return [1, 2, 3, 4, 5].map((index) => (
    <Star
      key={index}
      className="w-4 h-4"
      color={index <= Math.round(rating) ? '#FFC107' : '#E4E5E9'}
      fill={index <= Math.round(rating) ? '#FFC107' : 'none'}
    />
  ));
};

export default Rating;