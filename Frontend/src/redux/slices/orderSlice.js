import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* -------------------- HELPER -------------------- */
const getToken = () => localStorage.getItem("userToken");

/* -------------------- ASYNC THUNKS -------------------- */

// 1️⃣ Fetch all orders of logged-in user
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// 2️⃣ Fetch single order details by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

/* -------------------- SLICE -------------------- */

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    totalOrders: [],     // ✅ all orders of the user
    orderDetails: null,  // ✅ single order details
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH MY ORDERS
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.totalOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ORDER BY ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
