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
    </section>
  )
}
