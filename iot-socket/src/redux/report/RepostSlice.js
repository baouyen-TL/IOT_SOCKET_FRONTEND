import { createSlice } from "@reduxjs/toolkit";
export const Report = createSlice({
    name: "question",
    initialState:{
        pending: false,
        error: false,
        questionResult: [],
        rankingResult:[]
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
    }
});

export const {QuestionResultStart, QuestionResultError, getQuestionResultId,getRankingtId} = Report.actions;
export default Report.reducer;