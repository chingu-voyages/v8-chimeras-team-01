import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Instructions() {
  return (
    <div className="instructions" id="instructions">
        <h1 className="instructions-header">A quick "How-To" while we get your game ready</h1>
        <div className="steps-wrapper">
          <h2 className="steps-title">3 simple steps to play</h2>
          <ol className="steps-list">
            <li className="step1">
              <p className="step1-instructions">Read the question and choose the RIGHT answer - [Hint: fastest gets MORE POINTS!]</p>
            </li>
            <li className="step2">
              <p className="step2-instructions">When the timer expires, confirm you had the right answer<br />(have a list of excuses ready incase you didn't)</p>
            </li>
            <li className="step3">
              <p className="step3-instructions">Check your place on the Leaderboard</p>
            </li>
          </ol>
          <div className="join-board">
            <p className="players-that-joined">This is where player names will show as they join ... maybe</p>
          </div>
        </div>
        <button className="start-game-btn">
          <Link to="/host/questions" className="link fbc">
            Let's Get Started !!
          </Link>
        </button>
    </div>
  )
}
