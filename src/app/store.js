import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '@/features/todo/todoSlice'
import darkModeReducer from '@/features/darkMode/darkModeSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        darkMode: darkModeReducer
    }
})