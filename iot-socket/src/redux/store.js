import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./Question/QuestionSlice";
import GlobalSliceReducer from "./Global/GlobalSlice";
import TopicReducer from "./Topic/TopicSlice";
import RemoteReducer from "./remote/remoteSlice";
import RepostReducer from "./report/RepostSlice";


export default configureStore({
    reducer: {
        question: QuestionReducer,
        global: GlobalSliceReducer,
        topic:TopicReducer,
        remote: RemoteReducer,
        report:RepostReducer
    }
}
)