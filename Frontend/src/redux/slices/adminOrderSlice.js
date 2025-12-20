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

/*  Fetch all orders (ADMIN) */
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

/*  Update order delivery status (ADMIN) */
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order"
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
    totalOrders: 0,
    totalSales: 0, 
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

        state.totalOrders = action.payload.length;

        state.totalSales = action.payload.reduce(
          (sum, order) => sum + Number(order.totalPrice || 0),
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE DELIVERY ---------- */
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
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
