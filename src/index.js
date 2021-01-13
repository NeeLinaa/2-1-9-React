
import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import CardMovie from './components/card-movie/card-movie';
import Search from './components/search/search';



const Index = () => (
      <div>   
        <Row align="top" gutter={[16, 24]}>
          <Col className='gutter-row' span={2} />
          <Col className='gutter-row' span={20}>
            <Search />
          </Col>
          {/* <Col className='gutter-row' span={2} /> */}
        </Row>
        
        <Row gutter={[16, 16]}>
          <Col className='gutter-row' span={2} />
          <Col className='gutter-row' span={20}>
            <CardMovie />
          </Col>
          <Col className='gutter-row' span={2} />
        </Row>
      </div>
)

ReactDOM.render(<Index />, document.getElementById('root'))