import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../Slices/TodoSlices"; 

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer, 
  },
});

export default store;
