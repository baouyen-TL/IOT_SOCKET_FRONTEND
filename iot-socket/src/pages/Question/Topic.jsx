import { Button, Input, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SetGlobal, SetTopic } from '../../redux/Global/GlobalSlice';
import { QuestionCircleOutlined } from '@ant-design/icons';


const Topic = () => {
    // input dữ liệu tạo chủ đề
    const [topicData, setTopicData] = useState("");
    const dispatch = useDispatch();
    const handleClick  = (e) =>{
        if(topicData !== ""){
            // Cho phép chuyển sang trang question
            dispatch(SetTopic(topicData));
            dispatch(SetGlobal(true));
        }else{
            // Không cho phép
            message.error("Vui lòng nhập chủ đề cần tạo")
            dispatch(SetGlobal(false));
        }
    } 
  return (
    <div className='w-[100%]'>
        <div className='flex items-center w-[100%] justify-center'>
            <label>Nhập chủ đề:</label>
            <Input 
                className='w-[50%] rounded-[5px] ml-4'
                onChange={(e) => setTopicData(e.target.value)}
                onPressEnter={(e)=>handleClick()}
            >
            </Input>
        </div>
        <div className='flex items-center w-[100%] justify-center mt-8'>
            <Button onClick={(e)=>handleClick()}>Tạo chủ đề</Button>
        </div>
    </div>
  )
}

export default Topic