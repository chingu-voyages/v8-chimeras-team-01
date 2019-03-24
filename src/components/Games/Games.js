import React, { useState } from 'react';
import './index.css';

export default function Games(props) {

  const [gameList, setGameList] = useState([{
    id: "0001",
    name: "Waffles",
    image: <i className="fas fa-stroopwafel fa-6x"></i>,
    desc: "What you know 'bout Waffles??"
  },
  {
    id: "0002",
    name: "Cookies",
    image: <i className="fas fa-cookie fa-6x"></i>,
    desc: "You know you can eat them, but what else??"
  }
]);

  return (
    <section id='games'>
      <h1>Choose your challenge</h1>
      {gameList.map(game => (
        <article className="game-tile" key={game.id}>
          <div className="gt-image fbc">{game.image}</div>
          <div className="gt-description">
            <h4>{game.name}</h4>
            <p>{game.desc}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
