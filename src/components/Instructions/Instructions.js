import React from 'react';
import './index.css';

export default function Instructions({ getStarted, users }) {

  const userNames = Object.keys(users);


  return (

    <div className="instructions fbc pm0" id="instructions">
      <h1 className="instructions-header text-center">A quick "how-to" while we prep your game</h1>
      <div className="steps-wrapper">
        <h2 className="steps-title text-center">3 simple steps to play</h2>
        <ol className="steps-list">
          <li className="step">
            <p className="step-instructions">Read the question and choose the RIGHT answer</p>
            <p className="ste1-instructions">[Hint: faster = MORE POINTS!]</p>
          </li>
          <li className="step">
            <p className="step-instructions">Timer hits 0: <br/> <em>you</em> check your answer, <br/> <em>we</em> tally the scores</p>
          </li>
          <li className="step">
            <p className="step-instructions">Check your place on the Leaderboard</p>
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
