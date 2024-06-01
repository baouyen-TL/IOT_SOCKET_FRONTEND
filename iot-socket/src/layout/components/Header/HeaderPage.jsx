import React, { useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate , useLocation} from 'react-router-dom';

const HeaderPage = () => {
  const { Header } = Layout;
  const items = [
    {
      key: "/",
      label: "Trang chủ"
    },
  {
    key: "/question",
    label: "Tạo câu hỏi"
  },
  {
    key: "/begingame",
    label: "Bắt đầu trò chơi"
  },
  {
    key: "/statistic",
    label: "Thống kê"
  },
  {
    key: "/connect-remote",
    label: "Kiểm tra thiết bị"
  },
]

const navigate = useNavigate();
const location = useLocation();
const NextPage = (e)=>{
  navigate(e.key);
}
  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent:'center',padding:'0' }}>
    <Menu
    className='justify-center 
    bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% 
    p-0'
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
      onClick={e=>NextPage(e)}
    />
  </Header>
  )
}

export default HeaderPage