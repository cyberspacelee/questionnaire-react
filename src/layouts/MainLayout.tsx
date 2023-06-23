import React, {FC} from 'react'
import {Outlet} from "react-router-dom";
import {Layout} from 'antd';
import styles from './MainLayout.module.scss'
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";

const MainLayout: FC = () => {
    const {Header, Footer, Content} = Layout;

    return (
        <>
            <Header className={styles.header}>
                <div className={styles.left}><Logo/></div>
                <div className={styles.right}><UserInfo/></div>
            </Header>
            <Content className={styles.main}>
                <Outlet/>
            </Content>
            <Footer className={styles.footer}>Questionnaire Online &copy;2023-present</Footer>
        </>
    )
}
export default MainLayout
