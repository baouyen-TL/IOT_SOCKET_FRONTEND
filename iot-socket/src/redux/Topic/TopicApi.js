import axios from 'axios'
import { createTopic, TopicError, TopicStart } from './TopicSlice';


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