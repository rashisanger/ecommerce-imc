import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProductGrid from "../components/Products/ProductGrid";

const Collectionpage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sidebarRef = useRef(null);
  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );

  const isSidebarOpen = searchParams.get("sidebar") === "open";

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      searchParams.delete("sidebar");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const category = searchParams.get("category") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    dispatch(fetchProductsByFilters({ category, maxPrice, sortBy }));
  }, [category, maxPrice, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Products */}
      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4">ALL products</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <ProductGrid products={products} />}
      </div>
    </div>
  );
};

export default Collectionpage;
