import { Button, Form, Input, message, Radio, Space, Upload } from 'antd';
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ObjQuestion = {
  questionName: "",
  questionTime: 0,
  imageUrl: "",
  listAnswers: []
};


const Questiondetail = () => {
  const [rows, setRows] = useState([ObjQuestion]);
  const TopicName = useSelector((state) => state.global.topic);
  const Answer = [
    "A",
    "B",
    "C",
    "D"
  ];

  const handleAddRow = () => {
    setRows([...rows, { ...ObjQuestion }]);
    console.log(rows);
  };
  const HanldeSaveQuestion = () =>{

  }

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => message.error('Error reading file: ', error);
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
      message.success(`${file.name} file uploaded successfully.`);
    });
    return false;
  };

  const handleAswer = (rowIndex, key, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        const updatedAnswers = row.listAnswers.map(answer => {
          if (answer.answerkey === key) {
            return { ...answer, answerName: value };
          }
          return answer;
        });

        if (!updatedAnswers.some(answer => answer.answerkey === key)) {
          updatedAnswers.push({ answerkey: key, answerName: value, isCorrect: false });
        }

        return { ...row, listAnswers: updatedAnswers };
      }
      return row;
    });
    setRows(updatedRows);
  };
  const onChange = (rowIndex, key) => {
    debugger;
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        const updatedAnswers = row.listAnswers.map(answer => {
          if (answer.answerkey === key) {
            return { ...answer, isCorrect: true };
          }
          return { ...answer, isCorrect: false };
        });

        if (!updatedAnswers.some(answer => answer.answerkey === key)) {
          updatedAnswers.push({ answerkey: key, answerName: "", isCorrect: true });
        }

        return { ...row, listAnswers: updatedAnswers };
      }
      return row;
    });
    setRows(updatedRows);
  };
  const handleQueston = (rowIndex, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, questionName: value };
      }
      return row;
    });
    setRows(updatedRows);
  }
  const handleTime = (rowIndex, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, questionTime: value };
      }
      return row;
    });
    setRows(updatedRows);
  }
  return (
    <div>
      <div className='flex justify-end mt-[20px] pr-[20px]'>
      <Button  onClick={HanldeSaveQuestion}>
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
                style={{width:'800px', fontSize:'1rem', fontWeight:'500'}}
                autoSize={{ minRows: 1, maxRows: 10 }}
                value={row.questionName}
                onChange={(e) => handleQueston(rowIndex, e.target.value)}></Input.TextArea>
                <div className='ml-5'>
                  <Upload
                    style={{ display: 'flex' }}
                    name="file"
                    listType="picture"
                    showUploadList={true}
                    beforeUpload={(file) => handleBeforeUpload(rowIndex, file)}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>
              </div>
            </div>
            <div className='flex w-[100%] items-center mb-10'>
              <label className='w-[100px] text-base font-medium'>Thời gian :</label>
              <Input
                type="number"
                style={{width:'100px', marginRight:'5px', height:'25px', borderRadius:'10px'}}
                value={row.questionTime}
                onChange={(e) => handleTime(rowIndex, e.target.value)}></Input>
              <div>(Đơn vị giây)</div>
            </div>
            <div className='flex justify-evenly'>
              <div className='flex '>
                {
                  Answer.map((key, answerIndex) => (
                    <div key={answerIndex} className='flex mr-10 items-center'>
                      <label className='w-[20px] font-semibold'>{key}:</label>
                      <Input
                      style={{height:'40px', borderRadius:'8px'}}
                        value={row.listAnswers.find(answer => answer.answerkey === key)?.answerName || ""}
                        onChange={(e) => handleAswer(rowIndex, key, e.target.value)}></Input>
                    </div>
                  ))}
              </div>
              <div>
                <label className='mr-[10px]'>Chọn đáp án đúng:</label>
                <Radio.Group
                  onChange={(e) => onChange(rowIndex, e.target.value)}
                  value={row.listAnswers.find(answer => answer.isCorrect)?.answerkey}>
                    <Space direction="vertical">
                  {
                    Answer.map((key, answerIndex) => (
                      <Radio key={answerIndex} value={key} style={{fontWeight:'600'}}>{key}</Radio>
                    ))
                  }
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
      <Button  onClick={handleAddRow}>
        Thêm câu hỏi
      </Button>
      </div>
    </div>
    </div>

  )
}

export default Questiondetail