import React, { useState, useEffect } from 'react';

export default function BrowseGames({ showGames, handleToggleGames }) {

  /**
   * @method [useState(gameList)]
   * @description [Array of games available to map over and display in tiles]
   */
  const [gameList, setgameList] = useState([
    {
      id: "",
      name: "",
      image: <i className="fas fa-stroopwafel fa-6x"></i>,
      desc: "What you know 'bout Waffles??",
    }
  ]);

  useEffect(() => {
    async function fetchQuestions() {
    const response = await fetch('/api/questions');
    const data = await response.json();
    return setgameList({
      id: data[0].id,
      name: data[0].category,
      image: <i className="fas fa-stroopwafel fa-6x"></i>,
      desc: "What you know 'bout Waffles??"
    })
  }
    fetchQuestions();
  }, []);

  return (
    <section className={!!showGames ? 'games show-games' : "games"} >
      <button className="games-close pm0 pointy"
              onClick={() => {handleToggleGames(false)}}> X close </button>
            <h1>Browse Available Challenges.</h1>
      <div className="games-container">
          <article className="game-tile" key={gameList.id} >
            <div className="gt-image fbc pm0">{gameList.image}</div>
            <div className="gt-description pm0">
              <h4>{gameList.name}</h4>
              <p>{gameList.desc}</p>
            </div>
          </article>
      </div>
    </section>
  )
}
