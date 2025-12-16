import React from 'react'
import { Link } from 'react-router-dom'

import healthcare from '../../assets/health&nutrition.jpg'
import skincare from '../../assets/skincare.jpg'
import personalcare from '../../assets/personalcare.jpg'
import babycare from '../../assets/babycare.jpg'

const categories = [
  {
    title: "Health & Nutrition",
    image: healthcare,
    bg: "group-hover:bg-yellow-300",
    link: `/collections/all?category=${encodeURIComponent("Health & Nutrition")}`,
  },
  {
    title: "Skin Care",
    image: skincare,
    bg: "group-hover:bg-green-400",
    link: `/collections/all?category=${encodeURIComponent("Skin Care")}`,
  },
  {
    title: "Personal Care",
    image: personalcare,
    bg: "group-hover:bg-violet-400",
    link: `/collections/all?category=${encodeURIComponent("Personal Care")}`,
  },
  {
    title: "Baby Care",
    image: babycare,
    bg: "group-hover:bg-red-400",
    link: `/collections/all?category=${encodeURIComponent("Baby Care")}`,
  },
];


const ProductCollectionSection = () => {
  return (
    <section className="py-4 px-0 lg:px-0">
      <h1 className="text-4xl text-center font-semibold pb-4 text-green-900 mt-4 mb-4">
        Shop by Category
      </h1>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-lg group max-w-sm mx-auto"
          >
            <div className="h-64 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div
              className={`p-4 bg-white transition-colors duration-300 ease-out ${cat.bg}`}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {cat.title}
              </h4>

              <Link
                to={cat.link}
                className="inline-block text-sm font-medium underline text-gray-900 hover:text-gray-800"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCollectionSection;
