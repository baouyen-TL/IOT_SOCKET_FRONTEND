import { createSlice } from "@reduxjs/toolkit";
export const BeginGame = createSlice({
    name: "BeginGame",
    initialState:{
        pending: false,
        error: false,
        begingame: null,
    },
    reducers:{
        BeginGameStart: (state) => {
            state.pending = true
        },
        BeginGameError: (state) => {
            state.pending = false;
            state.error = true;
        },
        CreateBeginGame:(state,action)=>{
            state.pending = false;
            state.begingame = action.payload;
        },
    }
});

export const {BeginGameStart, BeginGameError, CreateBeginGame} = BeginGame.actions;
export default BeginGame.reducer;