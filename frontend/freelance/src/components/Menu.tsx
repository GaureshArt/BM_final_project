import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DashboardFilled,
  DesktopOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PieChartOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.store";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <HomeOutlined />, label: "Home" },
  { key: "2", icon: <MessageOutlined />, label: "Notifications" },
  { key: "3", icon: <ProjectOutlined />, label: "My Projects" },
  { key: "4", icon: <DashboardFilled />, label: "Dashboard" },
];
type MenuProp = {
tab:string
}
const MenuCom: React.FC<MenuProp> = ({tab}) => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const userId  = useAuthStore((state)=>state.userId);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleHomeClick = () => {
    nav(`/`)
  };

  const handleNotificationsClick = () => {};

  const handleProjectsClick = () => {
    nav(`/myprojects/${userId}`)
  };
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      handleHomeClick();
    } else if (e.key === "2") {
      handleNotificationsClick();
    } else if (e.key === "3") {
      handleProjectsClick();
    }
  };
  return (
    <div style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={[tab]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default MenuCom;
