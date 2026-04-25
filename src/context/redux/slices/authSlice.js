import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: null,
  accessToken: null,
  userId: null,
  permissions: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      const { accessToken, role, userId, permissions } = action.payload;
      state.isAuthenticated = true;
      state.role = role;
      state.accessToken = accessToken;
      state.userId = userId;
      state.permissions = permissions;
    },
    logoutReducer: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.accessToken = null;
      state.userId = null;
      state.permissions = null;
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
