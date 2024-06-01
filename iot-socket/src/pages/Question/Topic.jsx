import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SetGlobal } from '../../redux/Global/GlobalSlice';


const Topic = () => {
    // input dữ liệu tạo chủ đề
    const [topicData, setTopicData] = useState("");
    const dispatch = useDispatch();
    const handleClick  = (e) =>{
        if(topicData !== ""){
            // Cho phép chuyển sang trang question
            dispatch(SetGlobal(true));
        }else{
            // Không cho phép
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