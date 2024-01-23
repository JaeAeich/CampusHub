import { Link } from 'react-router-dom';
import { ShoppingCartIcon, Star, StarHalf } from 'lucide-react';

function getStarElement(index, rating) {
  if (rating - index >= 0) {
    return (
      <Star
        fill="yellow"
        strokeWidth={0}
        type="button"
        className="w-6 h-6 inline-flex justify-center items-center hover:text-yellow-400"
      />
    );
  }
  if (rating - index > -1) {
    return (
      <StarHalf
        fill="yellow"
        strokeWidth={0}
        type="button"
        className="w-6 h-6 inline-flex justify-center items-center hover:text-yellow-400"
      />
    );
  }
  return (
    <Star
      fill="gray"
      strokeWidth={0}
      type="button"
      className="w-6 h-6 inline-flex justify-center items-center hover:text-yellow-400"
    />
  );
}

function ProductCard() {
  return (
    <div className="relative inline-block m-7 w-full  max-w-xs overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to="/">
        <img
          className="object-cover"
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="product"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to="/">
          <h5 className="text-xl font-subheading tracking-tight text-primary">
            Nike Air MX Super 2500 - Red
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-primary">&#8377;449</span>
            <span className="text-sm text-primary line-through">&#8377;699</span>
          </p>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
              // TODO: Rating is hardcoded here.
              <span key={index}>{getStarElement(index, 4.8)}</span>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center justify-center rounded-md bg-accentLight px-5 py-2.5 text-center text-smm font-medium text-primary hover:bg-accent hover:text-background focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <ShoppingCartIcon className="mb-1 mr-2 h-7" />
          Add to cart
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
