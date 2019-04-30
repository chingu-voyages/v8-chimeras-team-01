import React, { useEffect } from "react";
import "./index.css";

export default function LeaderBoard(props) {
  /* SORT LEADERS */

  /**
 * [useEffect Hook]
 * @method  handleIncrementQ
 * @description  [Hook to move to next question when Questions re-mounts]
 */
  useEffect(() => {
    props.handleIncrementQ();
  }, []);

  /**
   * @function [sortUsers]
   * @param {Objects} list Objects containing only keys and value as a number
   * @description [Takes in users and returns players by descending order]
   * @returns {Object[]} All players with userName and score as keys and values to names and scores.
   */
  const sortUsers = function (list) {
    const sortable = [],
      orderedList = [];

    // Put keys and value into an array of arrays
    for (let key in list) {
      sortable.push([key, list[key]]);
    }

    // Sort array by value,
    sortable.sort(function (a, b) {
      return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
    });

    // Return array of objects
    let i;
    for (i = 0; i < sortable.length; i += 1) {
      orderedList.push({
        userName: sortable[i][0],
        score: sortable[i][1]
      });
    }


    return orderedList;
  };

  const { users } = props;
  const sortedUsers = sortUsers(users)

  return (
    <div id="leaderBoard" className="fbc">
      <div className="lb__banner">
        <span className="left-color"></span>
        <p className="lb__inspire_txt">
          Not being in first place just means you have a clear target
        </p>
        <span className="right-color"></span>
      </div>
      <div className="lb__container">
        <h1 className="lb__title">Leader Board</h1>
        <ol className="lb__ol">
          {sortedUsers.map((user, index) => (
            <li className="lb__li" key={index}>
              <mark>{user.userName}</mark>
              <small>{user.score}</small>
            </li>
          ))}
        </ol>
      </div>

      {!!props.hostReady && props.nextQuestion}

    </div >
  );
}
