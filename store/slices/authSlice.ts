import { AuthState, User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    resetCredentials: (state) => {
      state.user = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;
export default authSlice.reducer;
