import React from 'react';
import './index.css';

export default function Answer(props) {
    const { correct, answer } = props;
    return (
        <div className={`outline box ${correct}`}>
            {answer}
        </div>
    )
}
