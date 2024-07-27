import React from 'react'
import {  Layout, Menu } from 'antd';
import { useNavigate , useLocation} from 'react-router-dom';
import './styles.css'; // Đường dẫn đến file CSS

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
    key: "/list-topic",
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
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent:'center',padding:'0',top:'0',left:'0',right:'0',zIndex:'1',position:'fixed'}}>
    <Menu
    className='justify-center bg-gradient-to-b from-blue-500 to-cyan-500 p-0 '
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
      onClick={e=>NextPage(e)}
    >
        {items.map(item => (
          <Menu.Item key={item.key} className="menu-item-custom">
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
  </Header>
  )
}

export default HeaderPage