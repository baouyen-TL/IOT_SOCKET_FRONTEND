import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetQuestionByTopicIdApi } from '../../redux/Question/QuestionApi';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { GetListRemoteApi } from '../../redux/remote/remoteApi';
import './PlayGame.css'

const PlayGame = () => {
  const { beginGameId, topicid } = useParams();
  const [seconds, setSeconds] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [isResultView, setIsResultView] = useState(false);
  const [isShowButtonBeginCount, setIsShowButtonBeginCount] = useState(true);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [questionCurent, setQuestonCurent] = useState({
    questionTime: 0,
    questionName: "",
    imageUrl: null,
    listAnswerDatas: []
  });
  console.log(selectedAnswerIndex)
  const lstRemotes = useSelector(state => state.remote.remote);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const GetLstQuestion = async () => {
      await GetQuestionByTopicIdApi(topicid, dispatch);
      await GetListRemoteApi(dispatch);
    }
    GetLstQuestion();
  }, [topicid])
  const lstQuestion = useSelector(state => state.question.questionByTopicId)
  useEffect(() => {
    if (lstQuestion.length > 0) {
      setQuestonCurent(lstQuestion[questionIndex]);
      setSeconds(lstQuestion[questionIndex].questionTime);
    }
  }, [lstQuestion, questionIndex])

  const handleNextRequest = () => {
    setSelectedAnswerIndex(null);
    setIsShowButtonBeginCount(true);
    clearInterval(intervalRef.current);
    setIsResultView(false);
    const nextQuestion = questionIndex + 1;
    setQuestionIndex(questionIndex + 1);
    if (nextQuestion === lstQuestion.length - 1) {
      setIsEndGame(true);
    }
  }

  const handleEndGame = () => {
  }
  const startTimer = () => {
    setIsShowButtonBeginCount(false);
    if (seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds - 1;
          if (newSeconds === 0) {
            clearInterval(intervalRef.current);
            setIsResultView(true);
          }
          return newSeconds;
        });
      }, 1000);
    }
  }

  const handleSoonEndGame = () => {
    setIsResultView(true);
  }
  const hanldeCheckCorrectAnswer = () => {
    debugger
    questionCurent.listAnswerDatas.map((value,index) => {
      if(value.isCorrect)
        setSelectedAnswerIndex(index);
    })
  }
  return (
    <div className='flex m-4'>
      <div className='flex-1'>
        <div key={questionIndex} className='flex rounded-xl border-[4px] border-[#00ffc8] p-[15px]'>
          <div className='mr-[15px]'>Câu {questionIndex + 1}:</div>
          <div className='w-[88%]'>
            <div className='mb-[15px]'>{questionCurent.questionName}</div>
            {
              questionCurent.imageUrl !== null && (
                <div className='flex justify-center'>
                  <img className='h-[300px]' src={questionCurent.imageUrl} alt='image'></img>
                </div>
              )
            }
          </div>
        </div>
        <div className='answers-grid'>
          {questionCurent?.listAnswerDatas.map((value, index) => (
            <div key={index} className={`answer ${selectedAnswerIndex === index ? 'selected' : ''}`}>
              {value.answerKey}:{value.answerName}
            </div>
          ))}
        </div>
      </div>
      <div className='flex w-64 justify-center'>
        {
          isResultView === false ? (
            <div>
              <div>
                <div className='m-[10px]'>Đã chọn: 0/{lstRemotes.length.toString()}</div>
              </div>
              <div>
                <div className='clock'>
                  <div className='clock-face'>
                    <div className='clock-seconds'>{seconds} giây</div>
                  </div>
                </div>
                {isShowButtonBeginCount && (<Button className='ml-[5px]' onClick={() => startTimer()}>Bắt đầu</Button>)}

              </div>
              <div>
                <Button className='m-[10px]' onClick={handleSoonEndGame}>Kết thúc sớm</Button>
              </div>
            </div>
          ) : (
            <div className='w-[100%] pl-[24px]'>
              <div className='w-[100%] mb-[10px]'>
                <Button onClick={hanldeCheckCorrectAnswer} className='w-[100%]'>Đáp án chính xác</Button>
              </div>
              <div className='w-[100%] mb-[10px]'>
                <Button className='w-[100%]'>Xem kết quả</Button>
              </div>
              {
                isEndGame === false ? (
                  <Button className='w-[100%]' onClick={handleNextRequest}>Câu tiếp theo</Button>
                ) : (
                  <Button className='w-[100%]' onClick={handleEndGame}>Kết thúc</Button>
                )
              }
            </div>
          )
        }
      </div>

    </div>
  )
}

export default PlayGame