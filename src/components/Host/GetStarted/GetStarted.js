import React from 'react';
import { Link } from 'react-router-dom';

export default function GetStarted() {
    return (
        <Link to="/host/questions" className="link fbc">
            <button className="start-game-btn">
                Let's Get Started !!
        </button>
        </Link>
    )
}
