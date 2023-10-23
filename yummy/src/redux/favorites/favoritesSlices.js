import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../../redux/auth/authOperations";
import {
  fetchFavorites,
  addFavorite,
  deleteFavorite,
} from "./favoritesOperations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: null,
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchFavorites.pending]: handlePending,
    [deleteFavorite.pending]: handlePending,
    [fetchFavorites.rejected]: handleRejected,
    [deleteFavorite.rejected]: handleRejected,
    [fetchFavorites.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [deleteFavorite.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [logOut.fulfilled](state) {
      state.items = [];
      state.error = null;
      state.isLoading = false;
    },
    [addFavorite.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [addFavorite.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addFavorite.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
