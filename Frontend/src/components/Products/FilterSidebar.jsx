import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const [priceRange, setPriceRange] = useState(500);
    const [filters,setFilters]=useState({
        category:"",
        herbal_ingredients:"",

    })
    const categories=["health&nut"]
  return (
    <div className="p-4 space-y-6">
      {/* Heading */}
      <h2 className="text-xl font-semibold">Filters</h2>

      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-1 text-gray-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Health & Nutrition
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Skincare
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Personal Care
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Baby Care
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-2">Price</h3>
        <input
          type="range"
          min="50"
          max="1500"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full"
        />
        <p className="text-sm text-gray-600">Up to ₹{priceRange}</p>
      </div>

      {/* Sorting */}
      <div>
        <h3 className="font-medium mb-2">Sort By</h3>
        <select className="w-full border p-2 rounded">
          <option>Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Name: A to Z</option>
          <option>Name: Z to A</option>
        </select>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-black text-white py-2 rounded mt-4">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
