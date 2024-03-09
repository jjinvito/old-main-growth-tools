import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        showSidebar: (state) => {
            state.isVisible = true;
        },
        hideSidebar: (state) => {
            state.isVisible = false;
        },
        toggleSidebar: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { showSidebar, hideSidebar, toggleSidebar } = sideBarSlice.actions;

export default sideBarSlice.reducer;