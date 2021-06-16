import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color, width, height }) => (
    <div className="loading">
        <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
);
 
export default Loading;