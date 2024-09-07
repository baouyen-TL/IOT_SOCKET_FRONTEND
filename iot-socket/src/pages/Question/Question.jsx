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
    <div className="homequestion relative">
      <img className="backgroundImage" src={ImageQuestion} alt="image_question"></img>

      {IsTopicBtn === false ? (
        <div className="p-36">
          <div className="title">
            Bắt đầu tạo bộ câu hỏi
          </div>
          <Topic />
        </div>
      ) : (
        <div>
          <div className="title">
            Bắt đầu tạo bộ câu hỏi
          </div>
          <Questiondetail />
        </div>
      )}
    </div>
  );
};

export default Question;
