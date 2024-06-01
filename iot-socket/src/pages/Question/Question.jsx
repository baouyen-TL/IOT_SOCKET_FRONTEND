import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetQuestionByIdApi } from "../../redux/Question/QuestionApi";
import Topic from "./Topic";
import Questiondetail from "./Questiondetail";

const Question = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const callapi = async () => {
      await GetQuestionByIdApi(
        "08792227-EE37-40B2-AD2A-0C96726FCA38",
        dispatch
      );
    };
    callapi();
  }, []);

  const IsTopicBtn = useSelector((state) => state.global.global);

  return (
    <div className="w-[100%]">
      {IsTopicBtn == false ? (
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
