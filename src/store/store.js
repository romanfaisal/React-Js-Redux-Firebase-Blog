import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../services/posts";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
