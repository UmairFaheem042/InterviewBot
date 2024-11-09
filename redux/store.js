// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import interviewReducer from "./slices/interviewDataSlice";

export const store = configureStore({
  reducer: {
    interview: interviewReducer,
  },
});

export default store;
