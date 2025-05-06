import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState = {
  isAuthenticated: !!Cookies.get("authToken"),
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true; 
      state.user = action.payload;  
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;     
      Cookies.remove("authToken");        
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth,clearAuth } = authSlice.actions;

export default authSlice.reducer;
