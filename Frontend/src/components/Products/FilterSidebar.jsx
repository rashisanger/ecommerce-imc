import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(1500);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const applyFilters = () => {
    const params = {};

    if (category) params.category = category;
    if (priceRange) params.maxPrice = priceRange;
    if (sortBy) params.sortBy = sortBy;

    setSearchParams(params);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Filters</h2>

      {/* Category */}
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-1">
          {["health", "skincare", "personalcare", "babycare"].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value={cat}
                onChange={(e) => setCategory(e.target.value)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
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
        <p>Up to ₹{priceRange}</p>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-medium mb-2">Sort By</h3>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Relevance</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="nameAZ">Name: A to Z</option>
          <option value="nameZA">Name: Z to A</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-black text-white py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
