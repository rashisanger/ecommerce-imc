import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state) => state.products);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section className="py-16">
      <h2 className="text-4xl text-center font-semibold mb-10 text-green-800">
        Our Most Loved Products
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-scroll no-scrollbar px-4"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className="min-w-[300px] bg-white shadow rounded-lg"
          >
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="h-64 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-semibold">{product.name}</h4>
                <p className="mt-2">₹{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
