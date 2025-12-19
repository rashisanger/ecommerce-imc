import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../components/Layout/Hero";
import ProductCollectionSection from "../components/Products/ProductCollectionSection";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import HomeBestSeller from "../components/Products/HomeBestSeller";

import { fetchProducts } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  // ✅ correct state access
  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  // ✅ fetch best seller ON HOME LOAD
  useEffect(() => {
    dispatch(
      fetchProducts({
        bestSeller: true,
        limit: 1,
      })
    );
  }, [dispatch]);

  // ✅ DEFINE bestSeller properly (THIS FIXES THE ERROR)
  const bestSeller = products?.[0];

  return (
    <div>
      <Hero />
      <ProductCollectionSection />
      <FeaturedProducts />

      <h2 className="text-3xl text-center font-bold mb-4">
        Best Seller
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ✅ SAFE RENDER */}
      {!loading && bestSeller && (
        <HomeBestSeller product={bestSeller} />
      )}
    </div>
  );
};

export default Home;
