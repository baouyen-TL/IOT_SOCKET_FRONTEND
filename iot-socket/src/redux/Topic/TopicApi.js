import axios from 'axios'
import { SearchTopic, TopicError, TopicStart } from './TopicSlice';


export const createTopicApi = async(question, dispatch) => {
    const PK = process.env.REACT_APP_API;
    await dispatch(TopicStart());
    try{
        const res = await axios.post(`${PK}/Topic/create`, question);
        return res;
    }catch(err){
        await dispatch(TopicError());
    }
    return null;
}

export const SearchTopicApi = async (objRequest,dispatch) =>{
    const PK = process.env.REACT_APP_API;
    await dispatch(TopicStart());
    try{
        const response = await axios.post(`${PK}/Topic/search`,objRequest);
        dispatch(SearchTopic(response.data));
    }
    catch(error)
    {
        await dispatch(TopicError());
    }
}

export const DeleteTopicApi = async (topicId) =>{
    const PK = process.env.REACT_APP_API;
    try{
        const response = await axios.delete(`${PK}/Topic/delete?TopicId=${topicId}`);
        return response.data.data;
    }
    catch(error)
    {
        return false;
    }
}

export const DeleteTopicAndBeginGameIdApi = async (begingameId) =>{
    const PK = process.env.REACT_APP_API;
    try{
        const response = await axios.delete(`${PK}/BeginGame/delete?BeginGameId=${begingameId}`);
        return response.data.data;
    }
    catch(error)
    {
        return false;
    }
}

