import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
            
            {/* Image */}
            <div className="w-full h-80 mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={product.images?.[0]?.url || product.image || ""}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Price */}
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <p className="text-gray-400 line-through text-sm">₹{product.price}</p>
                <p className="text-green-700 font-bold text-sm">₹{product.discountPrice}</p>
              </div>
            ) : (
              <p className="text-gray-700 font-semibold text-sm">₹{product.price}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;