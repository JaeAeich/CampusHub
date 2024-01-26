import { Star, StarHalf } from 'lucide-react';

export default function Stars(rating: number) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((index) => {
        if (rating - index >= 0) {
          return (
            <Star
              fill="#e89ba1"
              strokeWidth={0}
              type="Button"
              className="md:w-6 md:h-6 w-4 h-4 inline-flex justify-center items-center hover:text-accent"
              key={index}
            />
          );
        }
        if (rating - index > -1) {
          return (
            <StarHalf
              fill="#e89ba1"
              strokeWidth={0}
              type="Button"
              className="md:w-6 md:h-6 w-4 h-4 inline-flex justify-center items-center hover:text-accent"
              key={index}
            />
          );
        }
        return (
          <Star
            fill="gray"
            strokeWidth={0}
            type="Button"
            className="md:w-6 md:h-6 w-4 h-4 inline-flex justify-center items-center hover:text-accent"
            key={index}
          />
        );
      })}
    </span>
  );
}
