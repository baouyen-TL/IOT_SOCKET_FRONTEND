import axios from 'axios'
import { CreateBeginGame, BeginGameStart, BeginGameError } from './TopicSlice';


export const createBeginGameApi = async(request, dispatch) => {
    const PK = process.env.REACT_APP_API;
    await dispatch(BeginGameStart());
    try{
        const res = await axios.post(`${PK}/begingame/create`, request);
        await dispatch(CreateBeginGame(res.data));
    }catch(err){
        await dispatch(BeginGameError());
    }
    return null;
}
