import React, { useState, useEffect } from 'react';
import './index.css';

export default function Games({ showGames, handleSetGame, pushLocation }) {

  /**
   * @method [useState(gameList)]
   * @description [Array of games available to map over and display in tiles]
   */
  const [gameList, setgameList] = useState([
    {
      id: "",
      name: "",
      image: <i className="fas fa-stroopwafel fa-6x"></i>,
      desc: "",
      questions: []
    }
  ]);

  useEffect( () => {
    async function fetchQuestions() {
    const response = await fetch('/api/questions');
    const data = await response.json();
    let questions = data[0];

    return setgameList({
      id: questions.id,
      name: questions.category,
      image: <i className="fas fa-stroopwafel fa-6x"></i>,
      desc: "What you know 'bout Waffles??",
      questions: questions.questions
    })
  }
    fetchQuestions(); 
  }, []);
  const handleSelectGame = (game) => {
    handleSetGame(game);
    pushLocation("/host/instructions")
  }

  return (
    <section className={!!showGames ? 'games show-games' : "games"} >
      <h1>Choose your challenge</h1>
      <div className="games-container">
          <article className="game-tile pointy"
                   key={gameList.id}
                   onClick={() => {handleSelectGame(gameList)}} >
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
