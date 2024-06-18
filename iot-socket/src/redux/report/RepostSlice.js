import { createSlice } from "@reduxjs/toolkit";
export const Report = createSlice({
    name: "question",
    initialState:{
        pending: false,
        error: false,
        questionResult: [],
        rankingResult:[],
        detailTopRanking:[],
        statistic:{}
    },
    reducers:{
        QuestionResultStart: (state) => {
            state.pending = true
        },
        QuestionResultError: (state) => {
            state.pending = false;
            state.error = true;
        },
        getQuestionResultId: (state,action) => {
            state.pending = false;
            state.questionResult = action.payload
            state.error = false;
        },
        getRankingtId: (state,action) => {
            state.pending = false;
            state.rankingResult = action.payload
            state.error = false;
        },
        getDetailTopRanking:(state,action) =>{
            state.detailTopRanking = action.payload
        },
        searchStatistic:(state,action) =>{
            state.statistic = action.payload
        }
    }
});

export const {QuestionResultStart, QuestionResultError, getQuestionResultId,getRankingtId,getDetailTopRanking,searchStatistic} = Report.actions;
export default Report.reducer;