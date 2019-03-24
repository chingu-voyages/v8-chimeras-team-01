import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Landing() {

  return (
    <section id="landing">
        <div className="start-game-section">
          <button className="start-game-button">
            <Link to="/games" className="link fbc">
              <p className="button-words"><strong>Are you a GameMaster??</strong></p>
              <p className="button-words">Host A Game</p>
            </Link>
          </button>
          <button className="start-game-button">
            <Link to="/join" className="link fbc">
              <p className="button-words"><strong>Have a Code??</strong></p>
              <p className="button-words">Join A Game</p>
            </Link>
          </button>
        </div>

        <div className="hth-container">
          <div className="how-to-host">
            <h4 className="hth-header">Want to Host a Game?</h4>
            <div className="how-to-box htb1">
              <span className="htb-num">1</span>
              <p>Choose "GameMaster" Option Above</p>
            </div>
            <div className="how-to-box htb2">
              <span className="htb-num">2</span>
              <p>Select A Game</p>
            </div>
            <div className="how-to-box htb3">
              <span className="htb-num">3</span>
              <p>Invite Friends!</p>
            </div>
          </div>
        </div>

        <div className="ge-container">
          <div className="gameplay-example">
            <span className="ge-header">Gameplay</span>
            <div>
              <span className="ge-description geb1">Setup a game with a few clicks</span>
              <span className="ge-pic geb2">SCREENSHOT</span>
            </div>
            <div>
              <span className="ge-pic geb3">SCREENSHOT</span>
              <span className="ge-description geb4">Answer the questions as they come</span>
            </div>
            <div>
              <span className="ge-description geb5">See who won Bragging Rights</span>
              <span className="ge-pic geb6">SCREENSHOT</span>
            </div>
          </div>
        </div>
    </section>
  )
}
