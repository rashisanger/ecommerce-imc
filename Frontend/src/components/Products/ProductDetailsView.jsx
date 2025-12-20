import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const ProductDetailsView = ({ product, similarProducts = [] }) => {
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (product?.sizes?.length && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product?.colors?.length && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart");
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-3xl text-center font-bold mb-6 text-green-800">
        Best Seller
      </h2>
      <div className="max-w-6xl mx-auto bg-gray-50 p-8shadow-md">

        <div className="flex flex-col md:flex-row">

          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                className={`w-20 h-20 cursor-pointer border ${
                  mainImage === img.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt={product.name}
              className="rounded-lg shadow-xl"
            />
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 md:ml-10 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold text-green-700 mb-4">₹{product.price}</p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="w-full py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* You may also like */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl text-center font-bold mb-6 text-green-800">
              You May Also Like
            </h2>
            <ProductGrid products={similarProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsView;
