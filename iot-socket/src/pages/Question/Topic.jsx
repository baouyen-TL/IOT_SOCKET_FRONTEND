import { Button, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SetGlobal } from '../../redux/Global/GlobalSlice';


const Topic = () => {
    const dispatch = useDispatch();
    const handleClick  = (e) =>{
        dispatch(SetGlobal(true));
    } 
  return (
    <div className='w-[100%]'>
        <div className='flex items-center w-[100%] justify-center'>
            <label>Nhập chủ đề:</label>
            <Input 
                className='w-[50%] rounded-[5px] ml-4'
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