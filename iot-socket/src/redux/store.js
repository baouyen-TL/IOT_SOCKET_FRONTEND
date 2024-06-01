import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./Question/QuestionSlice";
import GlobalSliceReducer from "./Global/GlobalSlice";

export default configureStore({
    reducer: {
        question: QuestionReducer,
        global: GlobalSliceReducer,
    }
}
)