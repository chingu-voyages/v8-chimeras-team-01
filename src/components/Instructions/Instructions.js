import React from 'react';
import './index.css';

export default function Instructions({ getStarted, users }) {

  const userNames = Object.keys(users);


  return (

    <div className="instructions" id="instructions">
      <h1 className="instructions-header text-center">A quick "How-To" while we get your game ready</h1>
      <div className="steps-wrapper">
        <h2 className="steps-title text-center">3 simple steps to play</h2>
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
      </div>
      <div className="join-board">
        <div className="players-that-joined">
          <h2 className="steps-title text-center">Players</h2>
          <ol className="player-list pm0 step__ol">
            {(userNames.length > 0) ?
              userNames.map( (name, index) => (
                <li className="step__li" key={index}>
                  <mark>{name}</mark>
                  <small>0</small>
                </li>
              ))
              :
              <li>No one but you here so far...</li>
            }
          </ol>
        </div>
      </div>
      <div className="instruction-btn">
        {getStarted}
      </div>
    </div>
  )
}
