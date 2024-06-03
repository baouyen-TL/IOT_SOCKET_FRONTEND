import { createSlice } from "@reduxjs/toolkit";
export const Remote = createSlice({
    name: "Remote",
    initialState:{
        pending: false,
        error: false,
        remote: []
    },
    reducers:{
        RemoteStart: (state) => {
            state.pending = true
        },
        RemoteError: (state) => {
            state.pending = false;
            state.error = true;
        },
        GetlstRemote: (state, action) => {
            state.pending = false;
            state.remote = action.payload
            state.error = false;
        }
    }
});

export const {RemoteStart, RemoteError,GetlstRemote} = Remote.actions;
export default Remote.reducer;