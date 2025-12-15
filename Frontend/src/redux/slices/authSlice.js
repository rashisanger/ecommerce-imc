import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info from localStorage
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Guest ID handling
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${Date.now()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token);

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

//async thuk for user registration
export const regsterUser=createAsyncThunk(
  "auth/loginUser",
  async(userData,{rejectWithValue})=>{
    try{
        const response=await axios.post({})
    }catch(error){

    }
  }
);
