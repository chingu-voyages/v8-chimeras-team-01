import React from 'react';
import './index.css';

export default function Instructions({ getStarted, users }) {

  const userNames = Object.keys(users);


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
          <div className="players-that-joined">
            <ul className="player-list pm0">
              {(userNames.length > 0) ?
                userNames.map( (name, index) => (
                  <li key={index}>{name}</li>
                ))
                :
                <li>No one but you here so far...</li>
              }
            </ul>
          </div>
        </div>
      </div>
      {getStarted}

    </div>
  )
}
