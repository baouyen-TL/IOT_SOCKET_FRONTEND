import { createSlice } from "@reduxjs/toolkit";
export const Global = createSlice({
    name: "global",
    initialState:{
        global: false
    },
    reducers:{
        SetGlobal: (state, action) => {
            state.global = action.payload
        }
    }
}
)
export const {SetGlobal} = Global.actions;
export default Global.reducer;