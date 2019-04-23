import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function GetStarted({ handleGetStarted }) {
    return (
        <Link to="/host/questions" className="link fbc">
            <button
              className="start-game-btn"
              onClick={()=>handleGetStarted()}>
                <p class="start-game_txt">Let's Get Started !!</p>
            </button>
        </Link>
    )
}
