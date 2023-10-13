import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.others;
      state.token = action.payload.token;
    },
    register: (state, action) => {
      state.user = action.payload.others;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("cart");
      localStorage.clear();
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;

// Store is composed of several slice,
//each slice cintain specific login
//or cart slice for cart logic
