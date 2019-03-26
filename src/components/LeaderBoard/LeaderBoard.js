import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function LeaderBoard() {
  return (
    <div id="leaderBoard">
      {/* TODO Component work flow */}
      <div className="lb__container">
        <h1 className="lb__title">
          Leader Board
        </h1>
        <ol className="lb__ol">
          <li className="lb__li">
            <mark>Luckia Lake</mark>
            <small>100</small>
          </li>
          <li className="lb__li">
            <mark>Los mierder</mark>
            <small>301</small>
          </li>
          <li className="lb__li">
            <mark>Paquito trae pan</mark>
            <small>292</small>
          </li>
          <li className="lb__li">
            <mark>Madrileños</mark>
            <small>245</small>
          </li>
          <li className="lb__li">
            <mark>Chotillos</mark>
            <small>203</small>
          </li>
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
