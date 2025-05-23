import { createSlice } from '@reduxjs/toolkit';

import { type User } from '../../utils/types';
import { login, getUser, refreshToken, updateUser, logout } from './thunks';

export type UserState = {
  user: User | null;
  isLoading: boolean,
  error: string;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    })
    .addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = "";
    })
    .addCase(login.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.error = action.payload ?? 'Что-то пошло не так';
    })
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = "";
    })
    .addCase(logout.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.error = action.payload ?? "Что-то пошло не так";
    })  
    .addCase(refreshToken.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    })
    .addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
    })
    .addCase(refreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Что-то пошло не так";
    })
    .addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    })
    .addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = "";
    })
    .addCase(getUser.rejected, (state, action) => {
      state.user = null; 
      state.isLoading = false;
      state.error = action.payload ?? "Что-то пошло не так";
    })
    .addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    })
    .addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = "";
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.user = null; 
      state.isLoading = false;
      state.error = action.payload ?? "Что-то пошло не так";
    });
  },
});

export default userSlice.reducer;