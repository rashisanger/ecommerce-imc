import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice"; 
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProductGrid from "../components/Products/ProductGrid";

const Collectionpage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sidebarRef = useRef(null);

  // ✅ productSlice state structure changed (items → products)
  const { products, loading, error } = useSelector(
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

  //  Added missing filters supported by backend + productSlice
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || ""; // NEW
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const search = searchParams.get("search") || ""; // NEW
  const limit = searchParams.get("limit") || ""; // NEW

  useEffect(() => {
    //  Updated thunk name + extended filters
    dispatch(
      fetchProducts({
        category,
        minPrice,
        maxPrice,
        sortBy,
        search,
        limit,
      })
    );
  }, [dispatch, category, minPrice, maxPrice, sortBy, search, limit]);

  return (
    <div className="flex flex-col lg:flex-row pt-24">
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
        <h2 className="text-2xl font-semibold uppercase mb-4">ALL PRODUCTS</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <ProductGrid products={products} />}
      </div>
    </div>
  );
};

export default Collectionpage;
