import { Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetListRemoteConnectApi } from '../../redux/remote/remoteApi';
import { useDispatch, useSelector } from 'react-redux';
import { createBeginGameApi } from '../../redux/BeginGame/BeginGameApi';
import { SetTopic } from '../../redux/Global/GlobalSlice';
import "./BeginGame.css"
import beginGameImage from '../../Image/begingame.png'


const BeginGame = () => {
    // Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy ra id của topic để tạo BeginGame
    const { topicid } = useParams();
    // Gọi api list remote đang connected
    useEffect(() => {
        const getListRemoteConnectedApi = async () => {
            await GetListRemoteConnectApi(dispatch);
        };
        getListRemoteConnectedApi();
    }, []);

    // Lấy ra list data Remote đang connected
    const lstRemotes = useSelector(state => state.remote.remoteconnect);

    // State lưu thông tin BeginGame để tạo
    const [className, setClassName] = useState("");
    const [listUser, setListUser] = useState([]);

    const handleChangeBeginGame = (value, item) => {
        const newlstUser = listUser.map((user) => {
            if (user.remoteId === item.remoteId) {
                return { ...user, userName: value }
            }
            return user;
        })
        if (!newlstUser.some(e => e.remoteId === item.remoteId)) {
            newlstUser.push({ remoteId: item.remoteId, userName: value })
        }
        setListUser(newlstUser);
    }
    const handleCreateGame = async () => {
        if(lstRemotes.length<=0)
            message.error("Không tìm thấy thiết bị để bắt đầu trò chơi");

        else if (className === '' || listUser.length < lstRemotes.length) {
            message.error("Vui lòng nhập đầy đủ thông tin!")
        }
        else {
            const objCreateGame = {
                topicId: topicid,
                className: className,
                listUserNames: listUser
            }
            const result = await createBeginGameApi(objCreateGame, dispatch);
            if (result.data.isSuccess) {
                dispatch(SetTopic(topicid));
                navigate(`/playgame/${topicid}/${result.data.data}`);
            }
            else {
                message.error("Lỗi nhập thông tin vui lòng kiểm tra lại!!!");
            }
        }
    }
    return (
        <div className='BeginGame'>
        <img src={beginGameImage} alt="image_question"></img>
        <div className='w-[100%] flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center mt-[100px] mb-[100px]'>
                <label className='font-semibold text-lg'>Tên lớp:</label>
                <Input
                    name="className"
                    placeholder="Nhập lớp" className='w-[500px] rounded-[5px] ml-4'
                    onChange={(e) => setClassName(e.target.value)}
                />
            </div>
            {/* Các hàng khác */}
            <div className='device-grid'>
                {
                    lstRemotes.map((item, index) => (
                        <div key={item.remoteId} className='device'>
                            <label>{item.remoteName}</label>
                            <Input
                                placeholder="Tên học sinh" className='w-[80%] rounded-[5px] m-2'
                                onChange={(e) => handleChangeBeginGame(e.target.value, item)}
                            />
                        </div>
                    ))
                }
            </div>
            <div className='flex items-center justify-center mt-8'>
                <Button className='ButtonBegin' onClick={handleCreateGame}>BẮT ĐẦU</Button>
            </div>
        </div>
        </div>
    )
}

export default BeginGame