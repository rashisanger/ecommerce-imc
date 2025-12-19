import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =======================
   Helpers: Local Storage
======================= */

// Load cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart
    ? JSON.parse(storedCart)
    : { products: [], totalPrice: 0 };
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Guest ID handling
const guestId =
  localStorage.getItem("guestId") || `guest_${Date.now()}`;
localStorage.setItem("guestId", guestId);

/* =======================
   Async Thunks
======================= */

// Fetch cart (guest or logged-in user)
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// Add item to cart

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, quantity, userId, guestId }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, quantity, userId, guestId }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          data: { productId, userId, guestId },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

// Merge guest cart into user cart (on login)
export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to merge cart"
      );
    }
  }
);

/* =======================
   Slice
======================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      saveCartToStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        saveCartToStorage(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        saveCartToStorage(state);
      })

      // Update quantity
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        saveCartToStorage(state);
      })

      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        saveCartToStorage(state);
      })

      // Merge guest cart
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        saveCartToStorage(state);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
