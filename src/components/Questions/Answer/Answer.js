import React from 'react';
import './index.css';

export default function Answer(props) {
    return (
        <div onClick={() => props.sendAnswer(props.correct)} className={`outline box ${props.correct}`}>
            {props.answer}
        </div>
    )
}
