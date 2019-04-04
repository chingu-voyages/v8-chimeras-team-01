import React from 'react';
import './index.css';

export default function Answer({ correct, answer }) {
    return (
        <div className={`outline box ${correct}`}>
            {answer}
        </div>
    )
}
