import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Results({ users }) {
  /* SORT LEADERS */

  /**
   * @function [topThree]
   * @param {Objects} list Objects containing only key and value as a number
   * @description [Takes in users and returns the top 3 players by descending order]
   * @returns {Object[]} Top three players with userName and score as key.
   */
  const topThree = function(list) {
    const sortable = [],
      topThree = [];

    // Put keys and value into an array of arrays
    for (let key in list) {
      sortable.push([key, list[key]]);
    }

    // Sort array by value, highest to low
    sortable.sort(function(a, b) {
      return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
    });

    // return just the first 3 items in the array of objects
    let i;
    for (i = 0; i < 3; i += 1) {
      topThree.push({
        userName: sortable[i][0],
        score: sortable[i][1]
      });
    }

    return topThree;
  };

  const sortedUsers = topThree(users);

  return (
    <div id="results">
      <div className="res__header" />
      <div className="res__container">
        <h1 className="res__title">
          Nice work {sortedUsers[0].userName}!
          <br />
          Time to BRAG
        </h1>
        <div className="res__wrapper">
          <div className="res__bar">
            <span className="res__bar_names">{sortedUsers[1].userName}</span>
            <div className="res__bar-inner" />
          </div>
          <div className="res__bar">
            <span className="res__bar_names">{sortedUsers[0].userName}</span>
            <div className="res__bar-inner" />
          </div>
          <div className="res__bar">
            <span className="res__bar_names">{sortedUsers[2].userName}</span>
            <div className="res__bar-inner" />
          </div>
        </div>
      </div>
      <button className="res__btn">
        <Link to="/start-game" className="res__btn-anchor">
          <p className="res__anchor_txt">Time for a REMATCH??</p>
        </Link>
      </button>
    </div>
  );
}
