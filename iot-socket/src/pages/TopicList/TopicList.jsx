import { Button, Pagination, Table, Switch, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { DeleteTopicApi, SearchTopicApi } from '../../redux/Topic/TopicApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const TopicList = () => {

  const [tableParams, setTableParams] = useState({
    paging: {
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
      width: 50,
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createTime",
      key: "createTime",
      width: 150,
      align: "center",
      render: (text) => format(new Date(text), 'dd-MM-yyyy HH:mm:ss')
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record) => {
        return (
          <div className=" flex justify-evenly">
            <Button onClick={() => handleButtonClick(record)}>Bắt đầu</Button>
            <Button onClick={()=>handleDeleteTopic(record)}>Xóa</Button>
          </div>
        );
      },
    },
  ];

  const navigate = useNavigate();
  const handleButtonClick = (record) => {
    navigate(`/begingame/${record.topicId}`);
  };
  const handleDeleteTopic = async (record) =>{
    const result = await DeleteTopicApi(record.topicId);
    if(result)
      message.success("Xóa chủ đề thành công");
    else
      message.error("Xóa chủ đề thất bại vui lòng thử lại sau !!!!");
  }

  // State lưu data topic
  const TopicResult = useSelector(state => state.topic.topics);
  // State lưu dữ liệu phân trang
  const PagingResult = useSelector(state => state.topic.topics.paging);
  // State tổng số phần tử
  const [totalCount, setTotalCount] = useState(0);
  // State tổng hiển thị trên 1 trang, mặc định là 5
  const [pageSize, setPageSize] = useState(5);
  // State số trạng hiện tại, mặc định là 1
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  // Mỗi khi chuyển trang thì gọi lại api searchTopic
  useEffect(() => {
    const functionSearchTopic = async () => {
      return await SearchTopicApi(tableParams, dispatch)
    }
    functionSearchTopic();
  }, [tableParams])

  // Nếu dữ liệu phân trang thay đổi thì set lại tổng số trang , và số lượng phần tử hiễn thị trên 1 page
  useEffect(() => {
    if (PagingResult) {
      setTotalCount(PagingResult.totalCount);
      setPageSize(PagingResult.pageSize);
    }
  }, [PagingResult]);

  // Khi nhấn nút đổi trang khác
  const handleTableChange = (e) => {
    setCurrentPage(e.defaultCurrent);
    setPageSize(e.pageSize);
    setTotalCount(e.total);
    setTableParams({
      paging: {
        pageIndex: e.current,
        pageSize: e.pageSize
      }
    })
  };
  return (
    <div>
      <div className="w-full flex justify-center mt-11">
        <Table
          columns={columns}
          dataSource={TopicResult.data}
          pagination={{
            total: totalCount, // total number of items
            pageSize: pageSize, // items per page
            defaultCurrent: currentPage, // default initial page
          }}
          onChange={(e) => handleTableChange(e)}
          scroll={{
            x: 1500,
          }}
        />
      </div>
    </div>
  )
}

export default TopicList