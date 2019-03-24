import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Results() {
  return (
    <div id="results">
      <div className="res__header">
        <h1 className="res__title">
          Nice work ${'{winnerName}'}! Time to BRAG
        </h1>
      </div>
      <div className="res__container">
        <div className="res__wrapper">
          <div className="res__bar">
            <span>${`{secondPlace}`}</span>
            <div className="res__bar-inner">
            </div>
          </div>
          <div className="res__bar">
            <span>${`{winner}`}</span>
            <div className="res__bar-inner">
            </div>
          </div>
          <div className="res__bar">
            <span>${`{thirdPlace}`}</span>
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
