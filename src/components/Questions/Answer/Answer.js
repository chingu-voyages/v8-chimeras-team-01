import React from 'react';
import './index.css';

export default function Answer({ sendAnswer, correct, answer }) {
    return (
        <div className={`outline box ${correct}`}
             onClick={() => sendAnswer(correct, answer)}>
            {answer}
        </div>
    )
}
