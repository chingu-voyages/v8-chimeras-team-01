import React, { useState, useEffect } from 'react';

export default function BrowseGames({ showGames, handleToggleGames }) {

  /**
   * @method [useState(gameList)]
   * @description [Array of games available to map over and display in tiles]
   */
  const [gameList, setgameList] = useState([]);

  useEffect( () => {
    async function fetchQuestions() {
    const response = await fetch('/api/questions');
    const data = await response.json();
    console.log( data[1]);

    return setgameList(data);
  }
    fetchQuestions();
  }, []);

  return (
    <section className={!!showGames ? 'games show-games' : "games"} >
      <button className="games-close pm0 pointy"
              onClick={() => {handleToggleGames(false)}}> X close </button>
            <h1>Browse Available Challenges.</h1>
      <div className="games-container">
      {gameList.map(game => (
          <article className="game-tile"
                   key={game.id} >
            <div className="gt-image fbc pm0"><img className="game-image"src={game.image} alt=""></img></div>
            <div className="gt-description pm0">
              <h4>{game.category}</h4>
              <p>{game.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
