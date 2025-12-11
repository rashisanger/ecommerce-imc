import React, { useState, useEffect, useRef } from 'react';
import shriTulsi from "../assets/shriTulsi.webp";
import himalayanBerry from "../assets/himalayanBerry.webp";
import aloeVeraJuice from "../assets/aloeVeraJuice.webp";
import aloeJyoti from "../assets/aloeJyoti.webp";
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';

const Collectionpage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        { _id: 1, name: "Shri Tulsi", price: 100, image: shriTulsi },
        { _id: 2, name: "Himalayan Berry", price: 100, image: himalayanBerry },
        { _id: 3, name: "Aloe Vera Fibrous Juice", price: 100, image: aloeVeraJuice },
        { _id: 4, name: "Aloe Jyoti", price: 100, image: aloeJyoti },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">

      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center mb-2"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300
          lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Product content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">ALL products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Collectionpage;
