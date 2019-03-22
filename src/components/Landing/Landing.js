import React from 'react';
import './index.css';

export default function Landing() {
  return (
    <section id="landing">
        <h1>Landing Component</h1>
        <article className="start-game-section">
          <div className="start-game-button">
            <p><strong>Are you a GameMaster??</strong></p>
            <p>Host A Game</p>
          </div>
        </article>
    </section>
  )
}
