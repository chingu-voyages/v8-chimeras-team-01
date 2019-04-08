import React from 'react';
import './index.css';

export default function Answer({ sendAnswer, correct, answer, handlePreventClicks }) {
    return (
        <div className={`box ${correct}`}
             onClick={() => sendAnswer(correct, answer)}
             onMouseUp={(event) => handlePreventClicks(event)}>
            {answer}
        </div>
    )
}
