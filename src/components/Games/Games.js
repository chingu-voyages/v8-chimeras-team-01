import React from 'react';
import './index.css';

export default function Games() {
  return (
    <section id='games'>
      <h1>Choose your challenge</h1>
      <article className="game-tile">
        <div className="gt-image">IMAGE</div>
        <div className="gt-description">
          <h4>Game Title</h4>
          <p>Test your knowledge of this topic. It might be fun!</p>
        </div>
      </article>
    </section>
  )
}
