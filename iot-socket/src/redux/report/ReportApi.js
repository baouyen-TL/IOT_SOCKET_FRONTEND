import axios from 'axios'
import { getQuestionResultId, getRankingtId, QuestionResultError, QuestionResultStart } from './RepostSlice';


export const GetQuestionResultApi = async(begingameId,questionId, dispatch) => {
    const PK = process.env.REACT_APP_API;
    await dispatch(QuestionResultStart());
    try{
        const res = await axios.get(`${PK}/Report/report-count-answer?BeginGameId=${begingameId}&QuestionId=${questionId}`);
        await dispatch(getQuestionResultId(res.data.data));
        return res.data.data
    }catch(err){
        await dispatch(QuestionResultError());
    }
    return null;
};

export const GetTopRankingApi = async(begingameId, dispatch) => {
    const PK = process.env.REACT_APP_API;
    await dispatch(QuestionResultStart());
    try{
        const res = await axios.get(`${PK}/Report/report-top-ranking?BeginGameId=${begingameId}`);
        await dispatch(getRankingtId(res.data.data));
        return res.data.data
    }catch(err){
        await dispatch(QuestionResultError());
    }
    return null;
}

