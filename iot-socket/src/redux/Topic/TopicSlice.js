import { createSlice } from "@reduxjs/toolkit";
export const Topic = createSlice({
    name: "Topic",
    initialState:{
        pending: false,
        error: false,
        topic: {}
    },
    reducers:{
        TopicStart: (state) => {
            state.pending = true
        },
        TopicError: (state) => {
            state.pending = false;
            state.error = true;
        },
        SearchTopic:(state,action)=>{
            state.topic = action.payload;
        }

    }
});

export const {TopicStart, TopicError, SearchTopic} = Topic.actions;
export default Topic.reducer;