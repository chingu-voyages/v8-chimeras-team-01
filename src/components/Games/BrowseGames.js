import React, { useState } from 'react';

export default function BrowseGames({ showGames, handleToggleGames }) {

  /**
   * @method [useState(gameList)]
   * @description [Array of games available to map over and display in tiles]
   */
  const [gameList] = useState([
    {
      id: "0001",
      name: "Waffles",
      image: <i className="fas fa-stroopwafel fa-6x"></i>,
      desc: "What you know 'bout Waffles??",
    }
  ]);

  return (
    <section className={!!showGames ? 'games show-games' : "games"} >
      <button className="games-close pm0 pointy"
              onClick={() => {handleToggleGames(false)}}> X close </button>
            <h1>Browse Available Challenges.</h1>
      <div className="games-container">
        {gameList.map(game => (
          <article className="game-tile" key={game.id} >
            <div className="gt-image fbc pm0">{game.image}</div>
            <div className="gt-description pm0">
              <h4>{game.name}</h4>
              <p>{game.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
