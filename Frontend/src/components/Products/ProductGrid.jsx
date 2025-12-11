import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images?.[0]?.url || product.image || ""}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              ₹{product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
