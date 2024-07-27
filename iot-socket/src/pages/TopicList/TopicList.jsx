import { Button, Pagination, Table, Switch, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { DeleteTopicApi, SearchTopicApi } from '../../redux/Topic/TopicApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import beginGameImage from '../../Image/begingame.png'
import './listTopic.css'

const TopicList = () => {

  const functionSearchTopic = async () => {
    return await SearchTopicApi(tableParams, dispatch)
  }
  const [tableParams, setTableParams] = useState({
    paging: {
      pageSize: 5,
      pageIndex: 1,
      orderBy: "",
      orderByDesc: "CreateTime"
    }
  })
  const columns = [
    {
      title: "Tên chủ đề",
      dataIndex: "topicName",
      key: "topicName",
      width: 95,
      align: "center",
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "countQuestion",
      key: "countQuestion",
      width: 80,
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createTime",
      key: "createTime",
      width: 80,
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
            <Button className='ButtonBeginDetail' onClick={() => handleButtonClick(record)}>Bắt đầu</Button>
            <Button className='ButtonEndSoomDetail' onClick={() => handleButtonEditQuestion(record)}>Chỉnh sửa</Button>
            <Button className='ButtonResultDetail' onClick={() => handleDeleteTopic(record)}>Xóa</Button>
          </div>
        );
      },
    },
  ];

  const navigate = useNavigate();
  const handleButtonClick = (record) => {
    navigate(`/begingame/${record.topicId}`);
  };
  const handleDeleteTopic = async (record) => {
    debugger;
    const result = await DeleteTopicApi(record.topicId);
    if (result) {
      functionSearchTopic();
      message.success("Xóa chủ đề thành công");
    }
    else
      message.error("Xóa chủ đề thất bại vui lòng thử lại sau !!!!");
  }

  const handleButtonEditQuestion = (record) => {
    navigate(`/editquestion/${record.topicId}`)
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
    <div className='ListTopic'>
      <img src={beginGameImage} alt="image_question"></img>
      <div className="w-full flex justify-center mt-11">
        <Table
          columns={columns}
          dataSource={TopicResult.data}
          className='tableListTopic'
          pagination={{
            total: totalCount, // total number of items
            pageSize: pageSize, // items per page
            defaultCurrent: currentPage, // default initial page
          }}
          onChange={(e) => handleTableChange(e)}
          scroll={{
            x: 800,
          }}
          style={{ '--header-bg-color': '#0c9488', '--header-text-color': "white" }}
        />
      </div>
    </div>
  )
}

export default TopicList