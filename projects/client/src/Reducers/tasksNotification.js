import { createSlice } from "@reduxjs/toolkit";

const tasksNotifSlice = createSlice({
    name: "tasksNotification",
    initialState: [],
    reducers: {
        setTasksNotification: (state, action) => {
            return [...action.payload];
        }
    },
});

export const {setTasksNotification} = tasksNotifSlice.actions;
export default tasksNotifSlice.reducer;