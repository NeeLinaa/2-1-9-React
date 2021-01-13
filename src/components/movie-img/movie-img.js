import React from 'react';
import { Image } from 'antd';

import './movie-img.css';

const MovieImg = () => {

    const movieTitle = fetch('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
        .then(resp => resp.json())

    return (
        <Image
            width={183}
            src={movieTitle}
        />
    )
}

export default MovieImg;