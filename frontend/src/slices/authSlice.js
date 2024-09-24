import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      // Store user info and token in localStorage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      // Save token in localStorage (assuming token is part of userInfo)
      if (action.payload.jwt) {
        localStorage.setItem("jwt", action.payload.jwt);
      }
    },
    logout: (state, action) => {
      state.userInfo = null;

      // Remove user info and token from localStorage on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("jwt");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
