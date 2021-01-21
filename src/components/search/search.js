import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Input } from 'antd';

import './search.css';


export default class Search extends Component {
    state = {

    }

    render() {

        const {getDataFromInput} = this.props;    

        return (
            <Input
                placeholder="Type to search..."
                onChange={element => getDataFromInput(element)}
            />
        )
    }
}

Search.defaultProps = {
    getDataFromInput: () => {}
}

Search.propTypes = {
    getDataFromInput: PropTypes.func
}