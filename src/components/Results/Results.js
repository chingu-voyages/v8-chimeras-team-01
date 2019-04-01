import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Results({ users }) {

  /* SORT LEADERS */
  const comparison = (a, b) => {
    const scoreA = a.score;
    const scoreB = b.score;
    let result = 0;
    if (scoreA < scoreB) {
      result = 1;
    } else if (scoreB < scoreA) {
      result = -1;
    }
    return result
  };

  const sortedUsers = users.sort(comparison);
  console.log(sortedUsers);

  return (
    <div id="results">
      <div className="res__header">
        <h1 className="res__title">
          Nice work {sortedUsers[0].userName}! Time to BRAG
        </h1>
      </div>
      <div className="res__container">
        <div className="res__wrapper">
          <div className="res__bar">
            <span>{sortedUsers[1].userName}</span>
            <div className="res__bar-inner">
            </div>
          </div>
          <div className="res__bar">
            <span>{sortedUsers[0].userName}</span>
            <div className="res__bar-inner">
            </div>
          </div>
          <div className="res__bar">
            <span>{sortedUsers[2].userName}</span>
            <div className="res__bar-inner">
            </div>
          </div>
        </div>
      </div>
      <button className="res__btn">
        <Link
          to="/start-game" className="res__btn-anchor"
        >
          <p className="">Time for a REMATCH??</p>
        </Link>
      </button>
    </div>
  )
}
