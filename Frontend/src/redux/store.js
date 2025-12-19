import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminOrderReducer from "./slices/adminOrderSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
  },
});

export default store;
