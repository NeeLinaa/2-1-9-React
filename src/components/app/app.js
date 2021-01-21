import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import debounce from "lodash.debounce";
import 'antd/dist/antd.css';
import CardMovie from '../card-movie/card-movie';
import Search from '../search/search';


export default class App extends Component {

    state = {
        valueFromInput: 'return',
        page: 1
    };

    getDataFromInput = (event) => {
        this.setState({
            valueFromInput: event.target.value
        })
    }

    changePage(num) {
        this.setState({
            page: num
        })
    }

    render() {

        const {valueFromInput, page} = this.state

        return (
            <div>   
                <Row align="top" gutter={[24, 24]}>
                <Col className='gutter-row' span={2} />
                <Col className='gutter-row' span={20}>
                    <Search getDataFromInput={debounce(this.getDataFromInput, 750)} />
                </Col>
                {/* <Col className='gutter-row' span={2} /> */}
                </Row>
                
                <Row gutter={[16, 16]} justify='space-between'>
                    <Col className='gutter-row' span={2} />
                    <Col className='gutter-row' span={20}>
                        <CardMovie 
                            newFunc={this.getData}
                            value={valueFromInput}
                            page={page}
                        />
                    </Col>
                    <Col className='gutter-row' span={2} />
                    <Pagination onChange={elem => this.changePage(elem)} defaultCurrent={1} total={50} />
                </Row>

            </div>
        )
    }
}

