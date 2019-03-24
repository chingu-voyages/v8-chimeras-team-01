import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Landing() {

  return (
    <section id="landing">
      <section id="view-button-container">
        <div className="button-box fbc">
          <i className="fas fa-question fa-3x"></i>
        </div>
        <div className="button-box fbc sel">
          <i className="fas fa-gamepad fa-3x"></i>
        </div>
      </section>

      <div className="ge-container">
        <div className="gameplay-example">
          <div className="fbc">
            <h4 className="ge-header fbc">How do I earn Bragging Rights?</h4>
          </div>
          <div className="ge-box geb1">
            <div className="ge-description fbc">Setup a game with a few clicks</div>
          </div>
          <div className="ge-box geb2">
            <div className="ge-description fbc">Answer the questions as they come</div>
          </div>
          <div className="ge-box geb3">
            <div className="ge-description fbc">See who won Bragging Rights</div>
          </div>
        </div>
      </div>

      <div className="start-game-section">
        <h4 className="fbc">Quick Launch</h4>
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
          <h4 className="hth-header fbc">Want to Host a Game?</h4>
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

    </section>
  )
}
