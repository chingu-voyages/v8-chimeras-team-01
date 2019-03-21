import React from 'react';
import { Link } from "react-router-dom";
import './index.css';


export default () => (
    <div id='nav'>
        <ul>
            <li><Link to="/">Landing Component</Link></li>
            <li><Link to="/results">Results Component</Link></li>
            <li><Link to="/gaming">Gaming Component</Link></li>
            <li><Link to="/questions">Questions Component</Link></li>
            <li><Link to="/leaderBoard">LeaderBoard Component</Link></li>
        </ul>
    </div>
)