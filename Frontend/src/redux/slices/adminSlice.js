import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* --------------------------------------------------
   Helper: get admin auth token
-------------------------------------------------- */
const getAuthConfig = () => {
  const token = localStorage.getItem("userToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ==================================================
   ASYNC THUNKS
================================================== */

/* 🔹 Fetch all users (ADMIN only) */
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

/* 🔹 Create user (ADMIN) */
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        getAuthConfig()
      );
      return data.user || data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

/* 🔹 Update user (ADMIN) */
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async({id, name, email, role}) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      {name, email, role},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data.user;
  }
);

/* 🔹 Delete user (ADMIN) */
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        getAuthConfig()
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

/* ==================================================
   SLICE
================================================== */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],          // ✅ all users (admin)
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAdminState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- Fetch Users ---------- */
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- Create User ---------- */
      .addCase(createUser.fulfilled, (state, action) => {
        const newUser =
          action.payload?.user || action.payload;

        if (newUser && newUser._id) {
          state.users.push(newUser);
        }

        state.success = true;
      })

      /* ---------- Update User ---------- */
      .addCase(updateUser.fulfilled, (state, action) => {
        state.success = true;
      })

      /* ---------- Delete User ---------- */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
        state.success = true;
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
