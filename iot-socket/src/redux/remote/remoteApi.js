import axios from "axios";
import { GetlstRemote, RemoteError, RemoteStart } from "./remoteSlice";

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