import { createSlice } from "@reduxjs/toolkit";
export const Topic = createSlice({
    name: "Topic",
    initialState:{
        pending: false,
        error: false,
        Topic: {}
    },
    reducers:{
        TopicStart: (state) => {
            state.pending = true
        },
        TopicError: (state) => {
            state.pending = false;
            state.error = true;
        }
    }
});

export const {TopicStart, TopicError, createTopic} = Topic.actions;
export default Topic.reducer;