import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import CardMovie from '../card-movie/card-movie';


const App = () => (
       <div>   
        <Row gutter={[24, 24]}>
            <Col className='gutter-row' span={2} />
            <Col className='gutter-row' span={10}>
                <CardMovie />
            </Col>
            <Col className='gutter-row' span={10}>
                <CardMovie />
            </Col>
            <Col className='gutter-row' span={2} />
        </Row>
       </div>
    )


export default App;