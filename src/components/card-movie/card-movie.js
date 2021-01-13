import React, { Component } from 'react';
import {  Row, Col, Image, Rate, Typography } from 'antd';
import { format } from 'date-fns';
import './card-movie.css';

export default class CardMovie extends Component {

    state = {
        array: [],
    }

    componentDidMount() {
         fetch('https://api.themoviedb.org/3/search/movie?api_key=b14771c0adfdc54f59204d41d5bf2302&query=return')
          .then(resp => resp.json())
          .then(rez => this.setState({ array: rez.results }))
    }
    
    shortText(longText, maxLength, postfix) {
    const pos = longText.indexOf(" ", maxLength);
    return (pos === -1 ? longText : longText.substr(0, pos) + postfix);
    }
    
    newCard(movie) {

       // const { image, originalTitle, date, overview, genres } = movie;
        const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const originalTitle = movie.original_title;
        const date = format(new Date(movie.release_date), 'PP');
        const genres = 'genres';
        const overview = this.shortText(movie.overview, 150, '...');
        const rating = movie.vote_average;

        const { Title, Text } = Typography;

        return (
            <Col xs={22} md={11}>
                <div className=" cardStyle">
                        <Row key={originalTitle} >
                            <Col className='gutter-row' span={12}>
                                <Image
                                    src={image}
                                    className='imageStyle'
                                />
                            </Col>
                            <Col className='gutter-row' span={1} />
                            <Col className='gutter-row' span={9}>
                                <Title level={5}>{originalTitle}</Title>
                                <Text disabled>{date}</Text> <br />
                                <Text keyboard type="secondary">{genres}</Text>
                                <Text>
                                    <p className='overview'>{overview}</p>
                                </Text>
                                <Rate allowHalf defaultValue={rating} count={10} />
                                <Col className='gutter-row' span={1} />
                            </Col>
                            <Col span={1}>
                                <Text strong><span className="ant-rate-text">{rating}</span></Text>
                            </Col>
                        </Row>
                </div>
            </Col>
            


        )
    }

    render() {
        const {array} = this.state
        return (
            <Row justify="space-around">
                { array.map(movie => this.newCard(movie)) }  
            </Row>          
        )
    }
}

