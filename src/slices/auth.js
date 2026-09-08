import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
    },

    editUser:(state, action) =>{
      state.user = {...state.user, ...action.payload}
      state.isAuthenticated = true
      state.isLoading = false
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    }
  }
});

export const { login, editUser, logout } = authSlice.actions;


export default authSlice.reducer;