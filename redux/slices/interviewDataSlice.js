// redux/slices/interviewSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interviewData: [], // Initial state for interview data
  activeQuestionIndex: 1,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviewData: (state, action) => {
      state.interviewData = action.payload;
    },
    setActiveQuestionIndex: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
  },
});

export const { setInterviewData, setActiveQuestionIndex } =
  interviewSlice.actions;
export default interviewSlice.reducer;
