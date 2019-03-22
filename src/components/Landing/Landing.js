import React from 'react';
import './index.css';

export default function Landing() {
  return (
    <section id="landing">
        <h1>Landing Component</h1>
        <article className="start-game-section">
          <button className="start-game-button">
            <p className="button-words"><strong>Are you a GameMaster??</strong></p>
            <p className="button-words">Host A Game</p>
          </button>
          <button className="start-game-button">
            <p className="button-words"><strong>Are you a GameMaster??</strong></p>
            <p className="button-words">Host A Game</p>
          </button>
        </article>
        <article className="how-to-host">
          <div className="how-to-box b1">
            <span className="htb-num">1</span>
            <p>Choose "GameMaster" Option Above</p>
          </div>
          <div className="how-to-box b2">
            <span className="htb-num">2</span>
            <p>Choose "GameMaster" Option Above</p>
          </div>
          <div className="how-to-box b3">
            <span className="htb-num">3</span>
            <p>Choose "GameMaster" Option Above</p>
          </div>
        </article>
    </section>
  )
}
