import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*  HELPERS  */
const getToken = () => localStorage.getItem("userToken");

/*  ASYNC THUNKS  */

//  Create checkout session
export const createCheckout = createAsyncThunk(
  "checkout/create",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create checkout"
      );
    }
  }
);

//  Mark checkout as paid
export const payCheckout = createAsyncThunk(
  "checkout/pay",
  async ({ checkoutId, paymentDetails }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment failed"
      );
    }
  }
);

//  Finalize checkout → create order
export const finalizeCheckout = createAsyncThunk(
  "checkout/finalize",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return data; // this is the ORDER
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to finalize checkout"
      );
    }
  }
);

/*  SLICE  */

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCheckout: (state) => {
      state.checkout = null;
      state.order = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE CHECKOUT
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PAY CHECKOUT
      .addCase(payCheckout.pending, (state) => {
        state.loading = true;
      })
      .addCase(payCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(payCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FINALIZE CHECKOUT
      .addCase(finalizeCheckout.pending, (state) => {
        state.loading = true;
      })
      .addCase(finalizeCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(finalizeCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
