import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ======================================================
   CONSTANTS
====================================================== */
const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

/* ======================================================
   AUTH CONFIG (Bearer Token)
====================================================== */
const getAuthConfig = () => {
  const token = localStorage.getItem("userToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ======================================================
   ASYNC THUNKS
====================================================== */

/* 🔹 Fetch all orders (ADMIN) */
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/admin/orders`,
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* 🔹 Update order delivery status (ADMIN) */
export const updateOrderDeliveryStatus = createAsyncThunk(
  "adminOrders/updateDelivery",
  async ({ orderId, isDelivered }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/admin/orders/${orderId}/deliver`,
        { isDelivered },
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update delivery status"
      );
    }
  }
);

/* 🔹 Delete order (ADMIN) */
export const deleteOrder = createAsyncThunk(
  "adminOrders/delete",
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/orders/${orderId}`,
        getAuthConfig()
      );
      return orderId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);

/* ======================================================
   SLICE
====================================================== */
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],          // ✅ all orders (admin)
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAdminOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE DELIVERY ---------- */
      .addCase(updateOrderDeliveryStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.success = true;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        state.success = true;
      });
  },
});

export const { resetAdminOrderState } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
