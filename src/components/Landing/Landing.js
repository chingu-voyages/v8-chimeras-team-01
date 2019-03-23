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
            <p className="button-words"><strong>Have a Code??</strong></p>
            <p className="button-words">Join A Game</p>
          </button>
        </article>

        <article className="how-to-host">
          <h4 className="hth-header">Want to Host a Game?</h4>
          <div className="how-to-box htb1">
            <span className="htb-num">1</span>
            <p>Choose "GameMaster" Option Above</p>
          </div>
          <div className="how-to-box htb2">
            <span className="htb-num">2</span>
            <p>Select A Game</p>
          </div>
          <div className="how-to-box htb3">
            <span className="htb-num">3</span>
            <p>Invite Friends!</p>
          </div>
        </article>

        <article className="gameplay-example">
          <span className="ge-description geb1">Setup</span>
          <span className="ge-pic geb2">SCREENSHOT</span>
          <span className="ge-pic geb3">SCREENSHOT</span>
          <span className="ge-description geb4">Gameplay</span>
          <span className="ge-description geb5">Results</span>
          <span className="ge-pic geb6">SCREENSHOT</span>
        </article>
    </section>
  )
}
