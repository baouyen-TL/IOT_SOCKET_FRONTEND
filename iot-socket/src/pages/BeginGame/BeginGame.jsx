import { Button, Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { SearchTopicApi } from '../../redux/Topic/TopicApi';
import { useDispatch, useSelector } from 'react-redux';
import { ProTable } from "@ant-design/pro-components";


const BeginGame = () => {

  const [tableParams,setTableParams] = useState({
    paging:{
      pageSize: 5,
      pageIndex: 1,
      orderBy: "",
      orderByDesc: ""
    }
  })
  const columns = [
    {
      title: "Tên chủ đề",
      dataIndex: "topicName",
      key: "topicName",
      width: 150,
      align: "center",
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "countQuestion",
      key: "countQuestion",
      width: 150,
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createTime",
      key: "createTime",
      width: 150,
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      width: 200,
      fixed: "right",
      align: "center",
      render: (_, record) => {
        return (
          <div className=" flex justify-evenly">
            <Button>Bắt đầu</Button>
          </div>
        );
      },
    },
  ];
  const TopicResult = useSelector(state => state.topic.topic);
  const dispatch = useDispatch();
  useEffect(() => {
    const functionSearchTopic = async () => {
      return await SearchTopicApi(tableParams, dispatch)
    }
    functionSearchTopic();
  }, [tableParams.paging?.pageIndex, tableParams.paging?.pageSize])
  useEffect(()=>{
    debugger
    if(TopicResult.length >0)
      {
        setTableParams({
          ...tableParams,
          paging:{
            ...tableParams.paging,
            totalCount:TopicResult.paging.totalCount
          }
        })
      }
  },[TopicResult])

  const handleTableChange = (paging, filters, sorter) => {
    debugger;
    setTableParams({
      paging,
      filters,
      ...sorter,
    });
  };
  return (
    <div>
      <div className="w-full flex justify-center mt-11">
        <Table
          rowKey={(e)=>e.topicId}
          search={false}
          options={false}
          className="mt-5 w-[55%] "
          columns={columns}
          dataSource={TopicResult.data}
          pagination={tableParams.paging}
          onChange={handleTableChange}
        />
      </div>
    </div>
  )
}

export default BeginGame