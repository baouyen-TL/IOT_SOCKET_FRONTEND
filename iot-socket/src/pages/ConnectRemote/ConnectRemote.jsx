import { Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetListRemoteApi } from '../../redux/remote/remoteApi';
import * as signalR from '@microsoft/signalr';

const ConnectRemote = () => {

  const [connection, setConnection] = useState(null);
  useEffect(() => {
      const newConnection = new signalR.HubConnectionBuilder()
          .withUrl("http://103.20.102.57:8011/chathub") // Thay thế bằng URL của máy chủ SignalR
          .withAutomaticReconnect()
          .build();

      setConnection(newConnection);
  }, []);

  useEffect(() => {
      if (connection) {
          connection.start()
              .then(() => {
                  console.log('Connected!');
              })
              .catch(error => {
                  console.log('Connection failed: ', error);
              });

          // Đăng ký hàm xử lý khi nhận được tin nhắn từ máy chủ
          connection.on("ReceiveMessage", (user, message) => {
              console.log(user, message);
              // Call Api
          });
      }
  }, [connection]);

const dispatch = useDispatch();
 useEffect (()=>{
  const getLstRemote = async ()=>{
    await GetListRemoteApi(dispatch);
  }
  getLstRemote();
 },[])

 const lstRemote = useSelector(state=>state.remote.remote);
  const columns = [
    {
      title: "Tên thiết bị",
      dataIndex: "remoteName",
      key: "remoteName",
      width: 150,
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: 200,
      fixed: "right",
      align: "center",
      render: (_, record) => {
        const switchStyle = {
          backgroundColor: record.status === true ? "#52c41a" : "#f5222d", // Màu nền
          borderColor: record.status === true ? "#52c41a" : "#f5222d", // Màu viền
          color: "#ffffff", // Màu chữ
        };
        return (
          <div className=" flex justify-evenly">
            {
              <Space direction="vertical" size={"middle"}>
                <Switch
                  style={switchStyle}
                  disabled = {true}
                  checkedChildren="Đang kết nối"
                  unCheckedChildren="Hủy kết nối"
                  checked={record.status}
                />
              </Space>
            }
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full flex justify-center mt-11">
    <Table
    rowKey={(e)=>e.remoteId}
      search={false}
      options={false}
      className="mt-5 w-[55%] "
      columns={columns}
      dataSource={lstRemote}
      pagination={{ pageSize: 5, showTotal: undefined }}
    />
  </div>
  )
}

export default ConnectRemote