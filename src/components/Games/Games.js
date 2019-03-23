import React from 'react';
import './index.css';

export default function Games({gameList}) {

  return (
    <section id='games'>
      <h1>Choose your challenge</h1>
      {gameList.map(game => (
        <article className="game-tile" key={game.id}>
          <div className="gt-image">{game.image}</div>
          <div className="gt-description">
            <h4>{game.name}</h4>
            <p>{game.desc}</p>
          </div>
        </article>
      ))}
    </section>
  )
}


// {
//   id: "0001",
//   name: "Waffles",
//   image: `<i class="fas fa-stroopwafel"></i>`,
//   desc: "What you know 'bout Waffles??"
// }
