import { Button, Pagination, Table, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { SearchTopicApi } from '../../redux/Topic/TopicApi';
import { useDispatch, useSelector } from 'react-redux';

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
  const PagingResult = useSelector(state => state.topic.topic.paging);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const functionSearchTopic = async () => {
      return await SearchTopicApi(tableParams, dispatch)
    }
    functionSearchTopic();
  }, [tableParams])

  useEffect(() => {
    if (PagingResult) {
      setTotalCount(PagingResult.totalCount);
      setPageSize(PagingResult.pageSize);
    }
  }, [PagingResult]);

  const handleTableChange = (e) => {
    setCurrentPage(e.defaultCurrent);
    setPageSize(e.pageSize);
    setTotalCount(e.total);
    setTableParams({
      paging:{
        pageIndex: e.current,
        pageSize: e.pageSize
      }
    })
  };
  const [fixedTop, setFixedTop] = useState(false);
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
        onChange = {(e) => handleTableChange(e)}
        scroll={{
          x: 1500,
      }}
      summary={() => (
        <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              <Switch
                checkedChildren="Fixed Top"
                unCheckedChildren="Fixed Top"
                checked={fixedTop}
                onChange={() => {
                  setFixedTop(!fixedTop);
                }}
              />
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      // antd site header height
      sticky={{
        offsetHeader: 64,
      }}
    />
      </div>
    </div>
  )
}

export default BeginGame