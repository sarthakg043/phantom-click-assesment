import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Backend API URL
const API_URL = "http://localhost:3000/todos";

// Async Thunks
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addTodo = createAsyncThunk("todo/addTodo", async (newTodo) => {
    const response = await axios.post(API_URL, newTodo);
    return response.data;
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async (updatedTodo) => {
    const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
    return response.data;
});

export const removeTodo = createAsyncThunk("todo/removeTodo", async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

export const toggleComplete = createAsyncThunk("todo/toggleComplete", async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/toggle`);
    return response.data;
});

// Slice
const todoSlice = createSlice({
    name: "todo",
    initialState: { todos: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) state.todos[index] = action.payload;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(toggleComplete.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) state.todos[index] = action.payload;
            });
    },
});

export default todoSlice.reducer;
