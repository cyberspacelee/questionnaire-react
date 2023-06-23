import React, {FC} from 'react'
import {Button, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {MANAGE_INDEX_PATH} from "../router";
import styles from './Home.module.scss'


const {Title, Paragraph} = Typography;

const Home: FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>Questionnaire Online</Title>
                <Paragraph>已累计创建问卷 100 份 </Paragraph>
            </div>
            <div>
                <Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATH)}>Getting Started</Button>
            </div>
        </div>
    )
}
export default Home
