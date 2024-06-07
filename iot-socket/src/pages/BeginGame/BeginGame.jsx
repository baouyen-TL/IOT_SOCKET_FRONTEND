import { Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetListRemoteApi } from '../../redux/remote/remoteApi';
import { useDispatch, useSelector } from 'react-redux';


const BeginGame = () => {
    // Redux
    const dispatch = useDispatch();

    // Lấy ra id của topic để tạo BeginGame
    const {topicid} = useParams();

    // Gọi api list remote đang connected
    useEffect(() => {
        const getListRemoteConnectedApi = async () => {
            await GetListRemoteApi(dispatch);
        };
        getListRemoteConnectedApi();
    }, []);

    // Lấy ra list data Remote đang connected
    const lstRemotes = useSelector(state=>state.remote.remote);

    // State lưu thông tin BeginGame để tạo
    const [className, setClassName] = useState("");
    const [listUser, setListUser] = useState({
        listUserNames: [
            {
                remoteId: "",
                userName: ""
            }
        ]
    });

    const handleChangeBeginGame = (e,item) => {
        setListUser({ ...listUser, listUserNames: [
            {
                remoteId: item.remoteId,
                userName: e.target.value
            }
        ]});
    }

    console.log(listUser);
    return (
        <div className='w-[100%] flex flex-col items-center justify-center min-h-screen'>
        <div className='flex items-center justify-center mb-4'>
            <label>Nhập lớp:</label>
            <Input 
                name="className"
                placeholder="Nhập lớp" className='w-[200px] rounded-[5px] ml-4' 
                onChange={(e) => setClassName(e.target.value)}
            />
        </div>
        {/* Các hàng khác */}
        <div className='flex flex-wrap items-center justify-center mb-4'>
          {
              lstRemotes.map((item,index) => (
                  <div key={item.remoteId} className='flex w-[50%] justify-center items-center'>
                      <label>{item.remoteName}</label>
                      <Input 
                          placeholder="Tên học sinh" className='w-[80%] rounded-[5px] m-2' 
                          onChange={(e) => handleChangeBeginGame(e,item)}                  
                      />
                  </div>
              ))
          }
        </div>
        <div className='flex items-center justify-center mt-8'>
          <Button>BẮT ĐẦU</Button>
        </div>
    </div>
    )
}

export default BeginGame