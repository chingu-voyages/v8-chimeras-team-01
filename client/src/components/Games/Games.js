import React, { useState, useEffect } from 'react';
import './index.css';

export default function Games({ showGames, handleSetGame, pushLocation, setGameTwo }) {

  /**
   * @method [useState(gameList)]
   * @description [Array of games available to map over and display in tiles]
   */
  const [gameList, setgameList] = useState([
    {
      id: "1",
      description: "",
      image: "",
      category: "",
      questions: [],
    },
    {
      id: "2",
      description: "",
      image: "",
      category: "",
      questions: [],
    },
  ]);

  useEffect( () => {
    async function fetchQuestions() {
    const response = await fetch('/api/questions');
    const data = await response.json();
    return setgameList(data);
  }
    fetchQuestions();
  }, []);


  /**
   * @method [handleSelectGame]
   * @param {Objects} game Object containing gameList information
   * @description [Takes selected game information and passes it to the host state via handleSetGame method, pushes to instructions page]
   */
  const handleSelectGame = (game) => {
    handleSetGame(game);
    pushLocation("/host/instructions");
  }

  return (
    <section className={!!showGames ? 'games show-games' : "games"} >
      <h1>Choose your challenge</h1>
      <div className="games-container">
      {gameList.map(game => (
          <article className="game-tile pointy"
                   key={game.id}
                   onClick={() => {handleSelectGame(game)}} >
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
