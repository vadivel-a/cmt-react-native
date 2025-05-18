import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload.data;
      state.user = user;
      state.token = access_token;
      state.isAuthenticated = true;
    },
    setProfile: (state, action) => {
      const { data } = action.payload.data;
      state.user = data;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setProfile, logOut } = authSlice.actions;
export default authSlice.reducer;
