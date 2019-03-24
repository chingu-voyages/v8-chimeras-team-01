import React, { useState } from 'react';
import './index.css';

export default function Games({ showGames, handleToggleGames }) {

  /**
   * @method [useState(gameList)]
   * @description [Array of games available to map over and dispay in tiles]
   */
  const [gameList] = useState([
    {
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
    },
    {
      id: "0003",
      name: "Waffles",
      image: <i className="fas fa-stroopwafel fa-6x"></i>,
      desc: "What you know 'bout Waffles??"
    },
    {
      id: "0004",
      name: "Cookies",
      image: <i className="fas fa-cookie fa-6x"></i>,
      desc: "You know you can eat them, but what else??"
    }
  ]);

  return (
    <section className={!!showGames ? 'games show-games' : "games"} >
      <h1>Choose your challenge</h1>
      <div className="games-container">
        {gameList.map(game => (
          <article className="game-tile" key={game.id}>
            <div className="gt-image fbc">{game.image}</div>
            <div className="gt-description">
              <h4>{game.name}</h4>
              <p>{game.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
