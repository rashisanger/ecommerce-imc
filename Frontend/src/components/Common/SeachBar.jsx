import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom"; // 

const SeachBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();          
  const location = useLocation();          

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return; // ✅ avoid empty search

    // Preserve existing filters (category, price, etc.)
    const params = new URLSearchParams(location.search);
    params.set("search", searchTerm);

    //  Link for seaching terms
    navigate(`/collections/all?${params.toString()}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border px-3 py-1 rounded"
      >
        <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
        <input
          type="text"
          placeholder="Search product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-100 px-4 py-2 focus:outline-none w-full placeholder:text-gray-700"
        />
      </form>
    </div>
  );
};

export default SeachBar;
