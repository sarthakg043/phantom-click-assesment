import { createSlice } from "@reduxjs/toolkit";

const darkMode = localStorage.getItem('mode') === "true"

const initialState = {
    darkMode
}

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
            localStorage.setItem('mode', String(state.darkMode))
        },
    },
})

export const { toggleDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer