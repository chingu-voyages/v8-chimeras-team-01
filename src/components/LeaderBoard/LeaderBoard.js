import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function LeaderBoard({ users }) {

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
    <div id="leaderBoard">
      {/* TODO Component work flow */}
      <div className="lb__container">
        <h1 className="lb__title">
          Leader Board
        </h1>
        <ol className="lb__ol">
          {sortedUsers.map( (user, index) => (
            <li className="lb__li" key={index}>
              <mark>{user.userName}</mark>
              <small>{user.score}</small>
            </li>
          ))}
        </ol>
      </div>
      <div className="lb__banner">
        <p className="lb__title">Not being in first place just means you have a clear target</p>
      </div>

      <button className="lb__btn">
        <Link
          to="/next-question" className="lb__btn-anchor"
        >
          <p className="">Next Question</p>
        </Link>
      </button>
    </div>
  )
}
