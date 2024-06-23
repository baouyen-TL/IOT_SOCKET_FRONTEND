import axios from 'axios'
import { CreateBeginGame, BeginGameStart, BeginGameError } from './BeginGameSlice';


export const createBeginGameApi = async(request, dispatch) => {
    const PK = process.env.REACT_APP_API;
    await dispatch(BeginGameStart());
    try{
        const res = await axios.post(`${PK}/begingame/create`, request);
        await dispatch(CreateBeginGame(res.data));
        return res;
    }catch(err){
        await dispatch(BeginGameError());
    }
    return null;
    
}
export const DeleteTopicAndBeginGameIdApi = async (begingameId) =>{
    debugger;
    const PK = process.env.REACT_APP_API;
    try{
        const response = await axios.delete(`${PK}BeginGame/delete?BeginGameId=${begingameId}`);
        return response.data.data;
    }
    catch(error)
    {
        return false;
    }
}