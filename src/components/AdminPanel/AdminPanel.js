import { Layout, Menu } from 'antd';
import { AppstoreOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import './AdminPanel.css';
import { Link, Redirect, Route, Router, Switch } from 'react-router-dom';
import AddProducts from '../AddProducts/AddProducts';
import EditProduct from '../EditProduct';
import ManageProduct from '../ManageProduct';
import { useState } from 'react';


const AdminPanel = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const [key, setKey] = useState(1);

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" onClick={() => setKey(1)} icon={<AppstoreOutlined />}>
                        Manage Product
                    </Menu.Item>

                    <Menu.Item key="2" onClick={() => setKey(2)} icon={<PlusSquareOutlined />}>
                        Add Product
                    </Menu.Item>

                    <Menu.Item key="3" onClick={() => setKey(3)} icon={<EditOutlined />}>
                        Edit Product
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} Admin Panel />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>               
                            {
                                key === 1 && <ManageProduct></ManageProduct>
                            }

                            {
                                key === 2 && <AddProducts></AddProducts>
                            }

                            {
                                key === 3 && <EditProduct></EditProduct>
                            }

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}> ©2021 Created by Khayrul</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminPanel;

