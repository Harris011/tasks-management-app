import { configureStore } from "@reduxjs/toolkit";
import tasksNotificationReducer from "./tasksNotification";

export const globalStore = configureStore({
    reducer: {
        tasksNotification: tasksNotificationReducer
    }
})