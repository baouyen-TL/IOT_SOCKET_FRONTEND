import axios from "axios";
import { GetlstRemote, RemoteError, RemoteStart,DisconnectDevice, GetlistRemoteConnect } from "./remoteSlice";

export const GetListRemoteApi = async(dispatch) => {
    const PK = process.env.REACT_APP_API;
    console.log(PK);
    await dispatch(RemoteStart());
    try{
        const res = await axios.post(`${PK}/Remote/list`);
        await dispatch(GetlstRemote(res.data.data));
    }catch(err){
        await dispatch(RemoteError());
    }
}

export const GetListRemoteConnectApi = async(dispatch) => {
    const PK = process.env.REACT_APP_API;
    console.log(PK);
    await dispatch(RemoteStart());
    try{
        const res = await axios.get(`${PK}/Remote/list-connect-remote`);
        await dispatch(GetlistRemoteConnect(res.data.data));
    }catch(err){
        await dispatch(RemoteError());
    }
}

export const DisconnectApi = async(dispatch) => {
    const PK = process.env.REACT_APP_API;
    console.log(PK);
    await dispatch(RemoteStart());
    try{
        const res = await axios.post(`${PK}/Remote/disconnect-remote`);
        await dispatch(DisconnectDevice(res.data.data));
        return res.data.data;
    }catch(err){
        await dispatch(RemoteError());
        return false;
    }
}
export const initialRemoteApi = async () =>{
    const PK = process.env.REACT_APP_API;
    try
    {
        const res = await axios.post(`${PK}/Remote/initial-remote`);
        return res.data.data;
    }
    catch(error)
    {
        return false
    }
}
