import { createSlice } from "@reduxjs/toolkit";
export const Question = createSlice({
    name: "question",
    initialState:{
        pending: false,
        error: false,
        question: null,
        questionByTopicId: [],
        questionById: {},
    },
    reducers:{
        QuestionStart: (state) => {
            state.pending = true
        },
        QuestionError: (state) => {
            state.pending = false;
            state.error = true;
        },
        getQuestionByTopicId: (state,action) => {
            state.pending = false;
            state.questionByTopicId = action.payload
            state.error = false;
        },
        getQuestionById: (state,action) => {
            state.pending = false;
            state.questionById = action.payload
            state.error = false;
        },
        createQuestion: (state, action) => {
            state.pending = false;
            state.question = action.payload
            state.error = false;
        }
    }
});

export const {QuestionStart, QuestionError, getQuestionByTopicId, getQuestionById, createQuestion} = Question.actions;
export default Question.reducer;