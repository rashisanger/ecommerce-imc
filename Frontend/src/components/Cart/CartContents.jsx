import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  updateCartItem,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(
        updateCartItem({
          productId,
          quantity: newQuantity,
          userId,
          guestId,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId, userId, guestId }));
  };

  return (
    <div>
      {cart.products.map((item, index) => {
        // 🔥 SUPPORT BOTH STRUCTURES
        const product = item.product || item;

        if (!product) return null; // safety

        return (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={
                  product.images?.[0]?.url ||
                  product.image ||
                  ""
                }
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />

              <div>
                <h3>{product.name}</h3>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product._id || item.productId,
                        item.quantity - 1
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span className="mx-4">{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product._id || item.productId,
                        item.quantity + 1
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-medium">
                ₹{product.price?.toLocaleString?.() || product.price}
              </p>

              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product._id || item.productId
                  )
                }
              >
                <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
