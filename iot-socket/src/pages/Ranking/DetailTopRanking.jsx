import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetDetailTopRankingApi } from '../../redux/report/ReportApi'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import statisticImage from '../../Image/statistic.png';
import './ranking.css'
const DetailTopRanking = () => {
    const navigate = useNavigate();
    const { beginGameId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const getDetailTopRanking = async () => {
            await GetDetailTopRankingApi(beginGameId, dispatch);
        }
        getDetailTopRanking();
    }, [beginGameId])
    const handleRollbackBeginGame = () => {
        navigate(`/list-topic`);
    }

    const objDetailTopRanking = useSelector(state => state.report.detailTopRanking);
    const columns = [
        {
            title: "Tên người chơi",
            dataIndex: "userName",
            key: "userName",
            width: 150,
            align: "center",
        },
        {
            title: "Tổng số câu đúng",
            dataIndex: "scd",
            key: "scd",
            width: 150,
            align: "center",
        },
        {
            title: "Tổng số câu sai",
            dataIndex: "sckd",
            key: "sckd",
            width: 150,
            align: "center",
        },
        {
            title: "Tổng số câu không chọn",
            dataIndex: "sckc",
            key: "sckc",
            width: 250,
            align: "center",
        },
        {
            title: "Tổng thời gian chọn đúng",
            dataIndex: "ttgc",
            key: "ttgc",
            width: 250,
            align: "center",
        },
    ];
    return (
        <div className='Ranking'>
        <img src={statisticImage} alt="image_question"></img>
        <div className='mt-[80px]'>
        <Button className='ButtonDetailGoBack' onClick={handleRollbackBeginGame}>Trở về</Button>
            <div className='mt-[20px] flex justify-center font-semibold text-xl'>THÔNG TIN CHI TIẾT NGƯỜI CHƠI</div>
            <div className="w-full flex justify-center mt-11">
                <Table
                    columns={columns}
                    dataSource={objDetailTopRanking}
                    pagination={{ pageSize: 10, showTotal: undefined }}
                    style={{ '--header-bg-color': '#0c9488', '--header-text-color': "white" }}
                />
            </div>
        </div>
        </div>
    )
}

export default DetailTopRanking