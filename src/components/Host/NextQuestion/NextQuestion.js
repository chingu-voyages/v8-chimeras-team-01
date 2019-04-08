import React from 'react';
import { Link } from 'react-router-dom';

export default function NextQuestion() {
    return (
        <Link to="/host/questions" className="lb__btn-anchor">
            <button className="lb__btn">
                <p className="lb__anchor_txt">Next Question</p>
            </button>
        </Link>
    )
}
