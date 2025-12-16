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
export const registerUser= createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
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
//slice
const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout:(state)=>{
      state.user=null;
      state.guestId=`guest_${new Date().getTime()}`
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId",state.guestId);
    },
    generateNewGuestId:(state)=>{
      state.guestId=`guest_${new Date().getTime()}`
      localStorage.setItem("guestId",state.guestId);
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading=false;
      state.user=action.payload;
      state.error=null;
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    .addCase(registerUser.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
      state.loading=false;
      state.user=action.payload;
      state.error=null;
    })
    .addCase(registerUser.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    });
  },
});
export const {logout,generateNewGuestId}=authSlice.actions;
export default authSlice.reducer;
