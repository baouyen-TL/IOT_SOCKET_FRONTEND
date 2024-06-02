import { createSlice } from "@reduxjs/toolkit";
export const Global = createSlice({
    name: "global",
    initialState:{
        global: false,
        topic :""
    },
    reducers:{
        SetGlobal: (state, action) => {
            state.global = action.payload
        },
        SetTopic:(state,action) =>{
            state.topic = action.payload
        }
    }
}
)
export const {SetGlobal,SetTopic} = Global.actions;
export default Global.reducer;