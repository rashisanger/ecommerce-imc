import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import shriTulsi from "../../assets/shriTulsi.webp";
import himalayanBerry from "../../assets/himalayanBerry.webp";
import aloeVeraJuice from "../../assets/aloeVerajuice.webp";
import aloeJyoti from "../../assets/aloeJyoti.webp";

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newFeatured = [
    {
      _id: "1",
      name: "Shri Tulsi",
      price: 120,
      description: "A herbal blend known for boosting immunity and overall wellness.",
      images: [{ url: shriTulsi, altText: "Shri Tulsi" }],
    },
    {
      _id: "2",
      name: "Himalayan Berry",
      price: 150,
      description: "Rich in antioxidants, perfect for natural energy and vitality.",
      images: [{ url: himalayanBerry, altText: "Himalayan Berry" }],
    },
    {
      _id: "3",
      name: "Aloe Jyoti",
      price: 100,
      description: "Supports eye health with the goodness of aloe extracts.",
      images: [{ url: aloeJyoti, altText: "Aloe Jyoti" }],
    },
    {
      _id: "4",
      name: "Aloe Vera Juice",
      price: 130,
      description: "Detoxifying juice that aids digestion and skin health.",
      images: [{ url: aloeVeraJuice, altText: "Aloe Vera Juice" }],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-5xl font-semibold mb-4 text-green-800">
          Our Most Loved Products
        </h2>
        <p className="text-xl text-black mb-8 italic">
          Explore our most cherished herbal treasures, loved by wellness
          enthusiasts everywhere!
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll no-scrollbar bg-white flex gap-6 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } relative px-2`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newFeatured.map((product) => (
          <div
            key={product._id}
            className="min-w-[85%] sm:min-w-[50%] lg:min-w-[30%] bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-72 sm:h-80 lg:h-96 object-cover rounded-t-xl"
              draggable={false}
            />

            <div className="p-4">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-semibold text-green-800">{product.name}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>
                <p className="mt-2 font-medium text-black">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
