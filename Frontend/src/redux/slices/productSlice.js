import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/products`;

/* ============================
   FEATURED PRODUCTS (HOME)
============================ */
export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}?bestSeller=true&limit=8`);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch featured products");
    }
  }
);

/* ============================
   BEST SELLER (HOME)
============================ */
export const fetchBestSellerProduct = createAsyncThunk(
  "products/fetchBestSellerProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}?bestSeller=true&limit=1`);
      return data[0] || null;
    } catch (error) {
      return rejectWithValue("Failed to fetch best seller");
    }
  }
);

/* ============================
   EXISTING THUNKS (UNCHANGED)
============================ */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API, { params: filters });
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const { data } = await axios.get(`${API}/${id}`);
    return data;
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (id) => {
    const { data } = await axios.get(`${API}/similar/${id}`);
    return data;
  }
);

/* ============================
   SLICE
============================ */
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],              // collection page
    featuredProducts: [],      // home slider
    bestSellerProduct: null,   // home best seller
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.similarProducts = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* FEATURED */
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })

      /* BEST SELLER */
      .addCase(fetchBestSellerProduct.fulfilled, (state, action) => {
        state.bestSellerProduct = action.payload;
      })

      /* COLLECTION */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })

      /* PRODUCT DETAILS */
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      /* SIMILAR */
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
