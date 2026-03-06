import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null, // { name, email, userId, phone, date, contacts, etc. }
  keys: null, // { private, public }
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.keys = action.payload.keys;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.keys = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
  },
});

export const {login, logout, updateUser} = authSlice.actions;
export default authSlice.reducer;
