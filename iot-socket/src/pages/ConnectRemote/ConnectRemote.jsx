import { Space, Switch, Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetListRemoteApi } from '../../redux/remote/remoteApi';

const ConnectRemote = () => {

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