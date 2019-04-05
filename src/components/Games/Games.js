import React, { useState } from 'react';
import './index.css';

export default function Games({ showGames, handleToggleGames, handleSetGame, pushLocation }) {

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
      questions: [
        {
          q: "What shape does a waffle have on top?",
          a: ['Square', 'Circle', 'Triangle', 'Rhombus'],
          c: 'Square'
        },
        {
          q: "The word 'Waffle' first appeared in English around what year?",
          a: ['1', '1573', '1725', '2011'],
          c: '1725'
        },
        {
          q: "How many waffles-per-minute does the Waffle House sell on average??",
          a: ['100', '145', '1000', 'All The Waffles'],
          c: '145'
        },
      ]
    }
  ]);

  const handleSelectGame = (game) => {
    handleSetGame(game);
    pushLocation("/host/instructions")
  }

  return (
    <section className={!!showGames ? 'games show-games' : "games"} >
      <h1>Choose your challenge</h1>
      <div className="games-container">
        {gameList.map(game => (
          <article className="game-tile pointy"
                   key={game.id}
                   onClick={() => {handleSelectGame(game)}} >
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
