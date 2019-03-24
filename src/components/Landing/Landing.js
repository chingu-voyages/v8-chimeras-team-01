import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Landing() {

  /**
   * @method [useState(view)]
   * @description [Creates and sets state for which view is being displayed. This dictates which view is shown and which button is 'chosen']
   */
  const [view, setView] = useState("info");

  /**
   * @function [buttonSwitch]
   * @description [Changes which view button has sel based on view in state. Used in on click]
   */
  const buttonSwitch = (selection) => {
    if (selection !== view) {
      let buttons = document.getElementsByClassName("button-box");
      buttons[0].classList.toggle("sel");
      buttons[1].classList.toggle("sel");
      setView(selection);
      toggleView(selection);
    };
  }

  /**
   * @function [toggleView]
   * @description [Add/Remove shift class to slide correct view into screen]
   */
  const toggleView = (selection) => {
    let gameContainer = document.getElementsByClassName("start-game-container");
    let geContainer = document.getElementsByClassName("ge-container");
    if (selection === "info") {
      gameContainer[0].classList.add("shift-right");
      geContainer[0].classList.remove("shift-left");
    } else if (selection === "game") {
      gameContainer[0].classList.remove("shift-right");
      geContainer[0].classList.add("shift-left");
    }
  }

  return (
    <section id="landing">
      <section id="view-button-container">
        <div className="button-box fbc sel">
          <i className="fas fa-question fa-3x"
             onClick={() => {buttonSwitch("info")}}></i>
        </div>
        <div className="button-box fbc">
          <i className="fas fa-gamepad fa-3x"
             onClick={() => {buttonSwitch("game")}}></i>
        </div>
      </section>

      <section className="view-container">

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

        <section className="start-game-container shift-right">
          <div className="start-game-section">
            <h4 className="fbc">Quick Launch</h4>
            <button className="start-game-button fbc">
              <Link to="/games" className="link fbc">
                <p className="button-words"><strong>Are you a GameMaster??</strong></p>
                <p className="button-words">Host A Game</p>
              </Link>
            </button>
            <button className="start-game-button fbc">
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

      </section>

    </section>
  )
}
