import { createSlice } from "@reduxjs/toolkit";
export const Remote = createSlice({
    name: "Remote",
    initialState:{
        pending: false,
        error: false,
        remote: [],
        remoteconnect:[],
        disconnect:false
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
        },
        GetlistRemoteConnect:(state,action) =>{
            state.remoteconnect = action.payload
        },
        DisconnectDevice :(state,action) =>{
            state.disconnect = action.payload
        }
    }
});

export const {RemoteStart, RemoteError,GetlstRemote,GetlistRemoteConnect,DisconnectDevice} = Remote.actions;
export default Remote.reducer;