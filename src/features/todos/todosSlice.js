// слайс для состояния задач
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("todo")) || [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAddTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },

    setDeleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    setToggleTask: (state, action) => {
      const id = action.payload;

      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = !task.status;
      }
    },

    setEditTask: (state, action) => {
      //редактирование текста
      const { id, newText } = action.payload;

      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.text = newText; // обновление текста задачи
      }
    },

  },
});

export const {
  setAddTask,
  setToggleTask,
  setDeleteTask,
  setEditTask,
} = todosSlice.actions;
export default todosSlice.reducer;
