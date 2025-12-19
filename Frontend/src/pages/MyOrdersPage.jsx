import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const dispatch = useDispatch();

  const { totalOrders, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-xs uppercase text-gray-700 bg-gray-100">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Created</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {totalOrders.length > 0 ? (
              totalOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems[0]?.image}
                      alt={order.orderItems[0]?.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-2 px-4 font-medium text-gray-900">
                    {order._id}
                  </td>

                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="py-2 px-4">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </td>

                  <td className="py-2 px-4">
                    {order.orderItems.length}
                  </td>

                  <td className="py-2 px-4">
                    ₹{order.totalPrice}
                  </td>

                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
