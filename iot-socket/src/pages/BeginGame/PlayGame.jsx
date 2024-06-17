import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetQuestionByTopicIdApi } from '../../redux/Question/QuestionApi';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message, Modal } from 'antd';
import { GetListRemoteConnectApi, initialRemoteApi } from '../../redux/remote/remoteApi';
import './PlayGame.css';
import * as signalR from '@microsoft/signalr';
import { SaveAnswerApi } from '../../redux/answer/AnswerApi';
import BarChart from '../../Components/BarChart';
import { GetQuestionResultApi } from '../../redux/report/ReportApi';

const PlayGame = () => {
  const { beginGameId, topicid } = useParams();
  const [seconds, setSeconds] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [isResultView, setIsResultView] = useState(false);
  const [isShowButtonBeginCount, setIsShowButtonBeginCount] = useState(true);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [datachartQuestion, setDataChartQuestion] = useState([]);
  const [questionCurent, setQuestonCurent] = useState({
    questionTime: 0,
    questionName: "",
    imageUrl: null,
    listAnswerDatas: []
  });
  const [connection, setConnection] = useState(null);
  const timeQuestionRef = useRef();
  const questionCurentRef = useRef(questionCurent);
  const [countAnswer, setCountAnswer] = useState(0);
  const countAnswerRef = useRef(countAnswer);
  const navigate = useNavigate();
  useEffect(() => {
    countAnswerRef.current = countAnswer;
  }, [countAnswer])

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://103.20.102.57:8011/chathub")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  const lstRemotes = useSelector(state => state.remote.remoteconnect);
  const lstRemotesRef = useRef(lstRemotes);
  const [ishowChart, setIsShowChart] = useState(false);
  useEffect(() => {
    lstRemotesRef.current = lstRemotes
  }, [lstRemotes])
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetLstQuestion = async () => {
      await GetQuestionByTopicIdApi(topicid, dispatch);
      await GetListRemoteConnectApi(dispatch);
    };
    GetLstQuestion();
  }, [topicid, dispatch]);

  const lstQuestion = useSelector(state => state.question.questionByTopicId);

  const reportQuestionId = useSelector((state) => state.report.questionResult)
  useEffect(() => {
    var countChosseAnswer = 0;
    var dataShow = []
    reportQuestionId.forEach(element => {
      countChosseAnswer += element.totalUserSelected;
      dataShow.push(
        {
          label: element.answerKey,
          value: element.totalUserSelected
        }
      )
    });
    if (lstRemotesRef.current.length > countChosseAnswer) {
      dataShow.push(
        {
          label: 'Không chọn',
          value: lstRemotesRef.current.length - countChosseAnswer
        }
      )
    }
    setDataChartQuestion(dataShow)
  }, [reportQuestionId])
  useEffect(() => {
    if (lstQuestion.length > 0) {
      setQuestonCurent(lstQuestion[questionIndex]);
      setSeconds(lstQuestion[questionIndex].questionTime);
    }
  }, [lstQuestion, questionIndex]);

  useEffect(() => {
    questionCurentRef.current = questionCurent;
  }, [questionCurent]);

  const handleNextRequest = async () => {
    const initialRemote = await initialRemoteApi();
    if (initialRemote === false) {
      message.error("Lỗi reset remote vui lòng thử lại !!!")
    }
    else {
      setSelectedAnswerIndex(null);
      setIsShowButtonBeginCount(true);
      clearInterval(intervalRef.current);
      setIsResultView(false);
      setCountAnswer(0);
      const nextQuestion = questionIndex + 1;
      setQuestionIndex(nextQuestion);
      if (nextQuestion === lstQuestion.length - 1) {
        setIsEndGame(true);
      }
    }
  };

  const handleCancel = () => {
    setIsShowChart(false);
  }

  const handleEndGame = () => {
    navigate(`/ranking/${beginGameId}`);
  };

  const startTimer = () => {
    setIsShowButtonBeginCount(false);
    if (seconds > 0) {
      const datetime = new Date();
      datetime.setSeconds(datetime.getSeconds() + lstQuestion[questionIndex].questionTime);
      timeQuestionRef.current = datetime;
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
  };

  const handleSoonEndGame = () => {
    setIsResultView(true);
  };

  const hanldeCheckCorrectAnswer = () => {
    questionCurent.listAnswerDatas.forEach((value, index) => {
      if (value.isCorrect) setSelectedAnswerIndex(index);
    });
  };

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!');
        })
        .catch(error => {
          console.log('Connection failed: ', error);
        });

      connection.on("ChooseAnswer", (user, message, time) => {
        const validatedRemote = lstRemotesRef.current.find(x => x.remoteId.toUpperCase() === user.toUpperCase());
        if (validatedRemote !== undefined) {
          var dateChosseAnswer = new Date(time);
          var dateAnswer = new Date(timeQuestionRef.current);
          var differenceInMilliseconds = dateAnswer - dateChosseAnswer;
          var differenceInSeconds = Math.round(differenceInMilliseconds / 1000);

          const answerchossed = questionCurentRef.current.listAnswerDatas.find(x => x.answerKey === message);
          const objsaveAnswer = {
            beginGameId: beginGameId,
            answerId: answerchossed ? answerchossed.answerId : null,
            questionId: questionCurentRef.current.questionId,
            remoteId: user,
            questionTime: questionCurentRef.current.questionTime,
            countTime: differenceInSeconds
          };
          const saveAnswerToDb = async () => {
            await SaveAnswerApi(objsaveAnswer);
            setCountAnswer(countAnswerRef.current + 1);
          };
          saveAnswerToDb();
        }
      });
    }
  }, [connection]);
  const handleViewResult = async () => {
    const resultView = await GetQuestionResultApi(beginGameId, questionCurentRef.current.questionId, dispatch);
    if (resultView != null)
      setIsShowChart(true);
    else
      message.error("Lỗi lấy dữ liệu kết quả vui lòng thử lại!!!")
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
                <div className='m-[10px]'>Đã chọn: {countAnswer}/{lstRemotes.length.toString()}</div>
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
                <Button className='w-[100%]' onClick={handleViewResult}>Xem kết quả</Button>
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
      {
        ishowChart && (
          <Modal
            width={800}
            height={1000}
            visible={ishowChart}
            onCancel={handleCancel}
            footer={[<div className="hidden"></div>]}>
            <BarChart data={datachartQuestion} />
          </Modal>
        )
      }
    </div>
  )
}

export default PlayGame