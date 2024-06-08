import { getQuestionById, getQuestionByTopicId, QuestionError, QuestionStart,createQuestion } from "./QuestionSlice";
import axios from 'axios'


export const createQuestionApi = async(question, dispatch) => {
    const PK = process.env.REACT_APP_API;
    await dispatch(QuestionStart());
    try{
        const res = await axios.post(`${PK}/Question/create`, question);
       return res.data;
    }catch(err){
        await dispatch(QuestionError());
    }
    return null;
}

export const GetQuestionByIdApi = async(questionId, dispatch) => {
    const PK = process.env.REACT_APP_API;
    console.log(PK);
    await dispatch(QuestionStart());
    try{
        const res = await axios.get(`${PK}/Question/get-by-id?QuestionId=${questionId}`);
        await dispatch(getQuestionById(res.data));
    }catch(err){
        await dispatch(QuestionError());
    }
}


export const GetQuestionByTopicIdApi = async(topicId, dispatch) => {
    const PK = process.env.REACT_APP_API;
    await dispatch(QuestionStart());
    try{
        const res = await axios.get(`${PK}/Question/list-question-by-topicId?TopicId=${topicId}`);
        await dispatch(getQuestionByTopicId(res.data.data.listQuestionDatas));
    }catch(err){
        await dispatch(QuestionError());
    }
}