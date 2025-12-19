import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "../../redux/slices/cartSlice";

import {
  fetchProductById,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";

import ProductGrid from "./ProductGrid";

const ProductDetails = () => {
  const { id } = useParams(); // ✅ product ID from URL
  const dispatch = useDispatch();

  const {
    selectedProduct,
    similarProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  /* ------------------------------------
     FETCH PRODUCT & SIMILAR PRODUCTS
  ------------------------------------- */
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchSimilarProducts(id));
    }
  }, [id, dispatch]);

  /* ------------------------------------
     SET MAIN IMAGE
  ------------------------------------- */
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  /* ------------------------------------
     QUANTITY HANDLER
  ------------------------------------- */
  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1)
      setQuantity((prev) => prev - 1);
  };

  /* ------------------------------------
     ADD TO CART (TEMP LOGIC)
  ------------------------------------- */
  const { user } = useSelector((state) => state.auth);
  const userId = user ? user._id : null;
  const handleAddToCart = async () => {
    try {
      setIsButtonDisabled(true);

      await dispatch(
        addToCart({
          productId: selectedProduct._id,
          quantity,
          userId,
        })
      ).unwrap();

      toast.success("Product added to cart", { duration: 1000 });
    } catch (error) {
      toast.error(error || "Failed to add product");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  /* ------------------------------------
     LOADING & ERROR STATES
  ------------------------------------- */
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!selectedProduct) return null;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">

          {/* LEFT THUMBNAILS (DESKTOP) */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="md:w-1/2 mb-4">
            <img
              src={mainImage}
              alt={selectedProduct.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            {selectedProduct.discountPrice && (
              <p className="text-gray-500 line-through">
                ₹{selectedProduct.price}
              </p>
            )}

            <p className="text-xl text-black mb-4">
              ₹{selectedProduct.discountPrice || selectedProduct.price}
            </p>

            <p className="text-gray-600 mb-4">
              {selectedProduct.description}
            </p>


            {/* QUANTITY */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full py-2 rounded text-white ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4 text-green-800">
              You May Also Like
            </h2>
            <ProductGrid products={similarProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
