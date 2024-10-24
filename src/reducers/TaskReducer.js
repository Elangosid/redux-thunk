import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: [],
    isLoading: false,
  },
  reducers: {
    taskCreated(state, action) {
      state.task.push(action.payload);
      state.isLoading = false;
    },
    taskFetched(state, action) {
      state.task = action.payload;
      state.isLoading = false;
    },
    taskDeleted(state, action) {
      state.task = state.task.filter((task) => task.id !== action.payload);
    },
    taskUpdated(state, action) {
      state.task = state.task.map((task) => 
        task.id === action.payload.id ? action.payload : task 
      );
    },
  },
});

export const { taskCreated, taskFetched, taskDeleted, taskUpdated } = taskSlice.actions;

export default taskSlice.reducer;
