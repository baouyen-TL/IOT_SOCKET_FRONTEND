import { Button, Form, Input, message, Radio, Space, Spin, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateQuestionApi, GetQuestionByTopicIdApi } from '../../redux/Question/QuestionApi'; // import getQuestionsApi
import { createTopicApi } from '../../redux/Topic/TopicApi';
import { useNavigate, useParams } from 'react-router-dom';
import ImageQuestion from '../../Image/CreateQuestion.png';
import './Question.css'

const ObjQuestion = {
  topicId: "",
  questionId: "",
  questionName: "",
  questionTime: 0,
  imageUrl: "",
  videoUrl: "",
  listAnswerDatas: []
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EditQuestion = () => {
  const { topicid } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([ObjQuestion]);
  const [loading, setLoading] = useState(false);
  const Answer = ["A", "B", "C", "D"];
  const dispatch = useDispatch();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await GetQuestionByTopicIdApi(topicid, dispatch); // Call your API
      if (result != null && result.length > 0) {
        setRows(result);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, topicid]); // Add topicid to the dependency array


  const handleDeleteRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  const handleSaveQuestion = async () => {
    debugger;
    setLoading(true);
    const objRequest = {
      listQuestions: rows
    };
    const resultCreateQuestion = await UpdateQuestionApi(objRequest, dispatch);
    if (resultCreateQuestion != null && resultCreateQuestion.isSuccess === true) {
      message.success("Cập nhật bộ câu hỏi thành công!");
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRows([ObjQuestion]);
      navigate("/list-topic");
    } else {
      message.error("Cập nhật bộ câu hỏi thất bại!");
    }
    setLoading(false);
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => message.error('Error reading file: ', error);
  };

  const handleBeforeUploadVideo = (rowIndex, file) => {
    const maxFileSize = 50 * 1024 * 1024; // 50 MB
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      message.error("File video không đúng định dạng vui lòng kiểm tra lại!!!");
      return false;
    } else if (file.size > maxFileSize) {
      message.error("Kích thước video trên 50MB! vui lòng chọn video thấp hơn");
      return false;
    } else {
      getBase64(file, base64 => {
        const updatedRows = rows.map((row, index) => {
          if (index === rowIndex) {
            return { ...row, videoUrl: base64.split(',')[1] };
          }
          return row;
        });
        setRows(updatedRows);
        message.success(`${file.name} file video uploaded successfully.`);
      });
    }
    return false;
  };

  const handleBeforeUpload = (rowIndex, file) => {
    getBase64(file, base64 => {
      const updatedRows = rows.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, imageUrl: base64.split(',')[1] };
        }
        return row;
      });
      setRows(updatedRows);
      message.success(`${file.name} file image uploaded successfully.`);
    });
    return false;
  };

  const handleAnswer = (rowIndex, key, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        const updatedAnswers = row.listAnswerDatas.map(answer => {
          if (answer.answerKey === key) {
            return { ...answer, answerName: value };
          }
          return answer;
        });

        if (!updatedAnswers.some(answer => answer.answerKey === key)) {
          updatedAnswers.push({ answerKey: key, answerName: value, isCorrect: false });
        }

        return { ...row, listAnswerDatas: updatedAnswers };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const onChange = (rowIndex, key) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        const updatedAnswers = row.listAnswerDatas.map(answer => {
          if (answer.answerKey === key) {
            return { ...answer, isCorrect: true };
          }
          return { ...answer, isCorrect: false };
        });

        if (!updatedAnswers.some(answer => answer.answerKey === key)) {
          updatedAnswers.push({ answerKey: key, answerName: "", isCorrect: true });
        }

        return { ...row, listAnswerDatas: updatedAnswers };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleQuestion = (rowIndex, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, questionName: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleTime = (rowIndex, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, questionTime: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div className="homequestion relative">
      <img className="backgroundImage" src={ImageQuestion} alt="image_question"></img>
      <div className='questiondetail'>
        <Spin spinning={loading} indicator={antIcon}>
          <div className='flex justify-end mt-[20px] pr-[20px]'>
            <Button onClick={handleSaveQuestion}>
              Lưu bộ câu hỏi
            </Button>
          </div>
          <div className='p-[20px] justify-items-center'>
            <div style={{ marginTop: '5px' }}>
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                  <div className='flex items-center mb-10'>
                    <label className='w-[100px] text-xl font-semibold'>Câu {rowIndex + 1}:</label>
                    <div className='flex justify-between items-center'>
                      <Input.TextArea
                        style={{ width: '800px', fontSize: '1rem', fontWeight: '500' }}
                        autoSize={{ minRows: 1, maxRows: 10 }}
                        value={row.questionName}
                        onChange={(e) => handleQuestion(rowIndex, e.target.value)}
                      />
                      <div className='ml-5'>
                        <Upload
                          style={{ display: 'flex' }}
                          name="file"
                          listType="picture"
                          showUploadList={{
                            showPreviewIcon: true,
                            showRemoveIcon: false,
                            showDownloadIcon: false,
                          }}
                          beforeUpload={(file) => handleBeforeUpload(rowIndex, file)}
                          fileList={row.imageUrl ? [{ uid: '-1', name: 'image.png', status: 'done', url: row.imageUrl }] : []}
                        >
                          <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
                        </Upload>
                      </div>
                      <div className='ml-5'>
                        <Upload
                          style={{ display: 'flex' }}
                          name="file"
                          listType="picture"
                          showUploadList={{
                            showPreviewIcon: true,
                            showRemoveIcon: false,
                            showDownloadIcon: false,
                          }}
                          beforeUpload={(file) => handleBeforeUploadVideo(rowIndex, file)}
                          fileList={row.videoUrl ? [{ uid: '-1', name: 'video.mp4', status: 'done', url: row.videoUrl }] : []}
                        >
                          <Button icon={<UploadOutlined />}>Click to Upload Video</Button>
                        </Upload>
                      </div>
                      {/* Delete Button */}
                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteRow(rowIndex)}
                        style={{ marginLeft: '10px' }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className='flex w-[100%] items-center mb-10'>
                    <label className='w-[100px] text-base font-medium'>Thời gian :</label>
                    <Input
                      type="number"
                      style={{ width: '100px', marginRight: '5px', height: '25px', borderRadius: '10px' }}
                      value={row.questionTime}
                      onChange={(e) => handleTime(rowIndex, e.target.value)}
                    />
                    <div>(Đơn vị giây)</div>
                  </div>
                  <div className='flex justify-evenly'>
                    <div className='flex'>
                      {Answer.map((key, answerIndex) => (
                        <div key={answerIndex} className='flex mr-10 items-center'>
                          <label className='w-[20px] font-semibold'>{key}:</label>
                          <Input
                            style={{ height: '40px', borderRadius: '8px' }}
                            value={row.listAnswerDatas?.find(answer => answer.answerKey === key)?.answerName || ""}
                            onChange={(e) => handleAnswer(rowIndex, key, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className='mr-[10px]'>Chọn đáp án đúng:</label>
                      <Radio.Group
                        onChange={(e) => onChange(rowIndex, e.target.value)}
                        value={row.listAnswerDatas.find(answer => answer.isCorrect)?.answerKey}
                      >
                        <Space direction="vertical">
                          {Answer.map((key, answerIndex) => (
                            <Radio key={answerIndex} value={key} style={{ fontWeight: '600' }}>
                              {key}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default EditQuestion;
