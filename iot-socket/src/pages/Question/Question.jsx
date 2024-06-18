import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetQuestionByIdApi } from "../../redux/Question/QuestionApi";
import Topic from "./Topic";
import Questiondetail from "./Questiondetail";
import { SetGlobal } from "../../redux/Global/GlobalSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Question = () => {

  const IsTopicBtn = useSelector((state) => state.global.global);

  return (
    <div className="w-[100%]">
      <div className="m-[10px] font-semibold text-xl">
        Bắt đầu tạo bộ câu hỏi  <QuestionCircleOutlined />
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
