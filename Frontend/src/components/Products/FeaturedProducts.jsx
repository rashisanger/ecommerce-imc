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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl text-center font-bold mb-2 text-green-800 ">
          Our Most Loved Products
        </h2>
        <p className="text-center mb-8 text-lg text-gray-800">Our most loved herbal products—bringing nature’s touch to you</p>

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
              className="min-w-[280px] bg-white shadow-md rounded-xl border border-gray-200"
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="h-64 w-full object-cover rounded-xl"
              />
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h4 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h4>
                  <p className="mt-2 text-green-700 font-bold">₹{product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
