import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ======================================================
   CONSTANTS
====================================================== */
const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

/* ======================================================
   AUTH HEADER (Bearer Token)
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

/* 🔹 Fetch all products (ADMIN) */
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/admin/products`,
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

/* 🔹 Create new product (ADMIN) */
export const createProduct = createAsyncThunk(
  "adminProducts/create",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

/* 🔹 Update existing product (ADMIN) */
export const updateProduct = createAsyncThunk(
  "adminProducts/update",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

/* 🔹 Delete product (ADMIN) */
export const deleteProduct = createAsyncThunk(
  "adminProducts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/products/${id}`,
        getAuthConfig()
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

/* ======================================================
   SLICE
====================================================== */
const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],       // ✅ all admin products
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAdminProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE ---------- */
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.success = true;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.success = true;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.success = true;
      });
  },
});

export const { resetAdminProductState } = adminProductSlice.actions;
export default adminProductSlice.reducer;
