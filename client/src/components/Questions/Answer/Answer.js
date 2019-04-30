import React from 'react';
import './index.css';

export default function Answer({ handleChoice, correct, answer }) {
    return (
        <div className={`box ${correct}`}
            onClick={(event) => handleChoice(event, correct, answer)}
        >
            {answer}
        </div>
    )
}
