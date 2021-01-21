import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Row, Col, Image, Rate, Typography, Spin, Alert } from 'antd';
import { format } from 'date-fns';
import './card-movie.css';

export default class CardMovie extends Component {

    state = {
        array: [],
        loading: true,
        error: false,
    }

    componentDidMount() {
         this.sendRequest()
    }

    componentDidUpdate(prevProps) {
        const {value, page} = this.props

        if (page !== prevProps.page || value !== prevProps.value) {
            this.sendRequest()
        }
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    checkOnlineState = () => <Alert message="No internet connection" type="warning" showIcon closable />

    sendRequest() {
        const { value, page } = this.props
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=b14771c0adfdc54f59204d41d5bf2302&query=${value}&page=${page}`)
        .then(resp => resp.json())
        .then(rez => this.setState({
        array: rez.results,
        loading: false,
        }))
        .catch(this.onError)
        
    }

    shortText(longText, maxLength, postfix) {
    const pos = longText.indexOf(" ", maxLength);
    return (pos === -1 ? longText : longText.substr(0, pos) + postfix);
    }

    newCard(movie) {


       // const { image, originalTitle, date, overview, genres } = movie;
        const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const originalTitle = this.shortText(movie.original_title, 23, '...')
        const date = format(new Date(movie.release_date), 'PP');
        const genres = 'genres';
        const overview = this.shortText(movie.overview, 90, '...');
        const rating = movie.vote_average;

        const { Title, Text } = Typography;

        return (
            <Col xs={24} md={11} key={originalTitle + Math.random() * 100} >
                <div className="cardStyle">
                        <Row key={originalTitle} >
                            <Col className='gutter-row'
                                 span={11}
                                 style={{minHeight:275, maxHeight: 281, maxWidth: 183}}
                                 >
                                <Image
                                    src={image}
                                    className='imageStyle'
                                />
                            </Col>
                            <Col className='gutter-row' span={1} />
                            <Col className='gutter-row' span={11}>
                                <Row>
                                    <Col span={20}>
                                        <Title level={5}>{originalTitle}</Title>
                                    </Col>
                                    <Col span={4}>
                                        <Text strong>
                                            <span className="ant-rate-text ratingСircle">
                                                {rating}
                                            </span>
                                        </Text>
                                    </Col>
                                </Row>
                                <Text disabled>{date}</Text> <br />
                                <Text keyboard type="secondary">{genres}</Text>
                                <Text>
                                    <p className='overview'>{overview}</p>
                                </Text>
                                <Rate allowHalf defaultValue={rating} count={10} />
                            </Col>
                            <Col className='gutter-row' span={1} />
                        </Row>
                </div>
            </Col>
        )
    }

    spinner() {
        return (
            <div className="example" >
                <Spin size='large'/>
            </div>
        )
    }

    render() {
        const {array, loading, error} = this.state

        if (loading) return this.spinner()

        if (error || array === undefined || array === null) return <Alert message="Something went wrong" type="success" />

        if (!navigator.onLine) return this.checkOnlineState()

        if (array.length === 0) return <Alert message="Movie not found" type="success" />

        return (
            <div>
                <Row justify="space-between">
                    { array.map(movie => this.newCard(movie)) }
                </Row>
            </div>
        )
    }
}

CardMovie.defaultProps = {
    value: 'return',
    page: 0
}

CardMovie.propTypes = {
    value: PropTypes.string,
    page: PropTypes.number
}