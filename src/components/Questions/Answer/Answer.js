import React from 'react';
import './index.css';

export default function Answer(props) {
    const { sendAnswer, correct, answer } = props;
    return (
        <div onClick={() => sendAnswer(correct)} className={`outline box ${correct}`}>
            {answer}
        </div>
    )
}
