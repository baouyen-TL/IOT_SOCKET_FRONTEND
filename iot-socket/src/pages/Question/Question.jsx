import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetQuestionByIdApi } from "../../redux/Question/QuestionApi";
import Topic from "./Topic";
import Questiondetail from "./Questiondetail";
import { SetGlobal } from "../../redux/Global/GlobalSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ImageQuestion from '../../Image/CreateQuestion.png';
import './Question.css'
const Question = () => {

  const IsTopicBtn = useSelector((state) => state.global.global);

  return (
    <div className="homequestion">
      <img src={ImageQuestion} alt="image_question"></img>
      <div className="title">
        Bắt đầu tạo bộ câu hỏi
      </div>
      {IsTopicBtn === false ? (
        <div className="p-36">
          <Topic />
        </div>
      ) : (
        <div>
          <Questiondetail />
        </div>
      )}
    </div>
  );
};

export default Question;
