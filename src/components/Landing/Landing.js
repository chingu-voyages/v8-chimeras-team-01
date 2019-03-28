import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Games from '../Games';
import './index.css';

export default function Landing() {

  /**
   * @method [useState(view)]
   * @description [Creates and sets state for which view is being displayed. This dictates which view is shown and which button is 'chosen']
   */
  const [view, setView] = useState("info");

  /**
   * @function [buttonSwitch]
   * @param {string} selection
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
   * @param {string} selection
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

  /**
   * @function [toggleInfo]
   * @description [show/hide info drop down on when screen is larger than 600px]
   */
  const toggleInfo = (boolean) => {
    let geContainer = document.getElementsByClassName("ge-container");
    geContainer[0].classList.toggle("shift-up");
  }

  /**
   * @method [useState(showGames)]
   * @description [Create and change state to show/hide Games component]
   */
  const [showGames, setShowGames] = useState(false);

  /**
   * @function [toggleGames]
   * @param {boolean} boolean
   * @description [Trigger show/hide of Games component]
   */
  const toggleGames = (boolean) => {
    if (boolean !== showGames) {
      setShowGames(boolean);
    }
  }

  return (
    <section id="landing pm0">
      <i className="fas fa-question pointy lrg-scrn-icon"
         onClick={toggleInfo}></i>
       <section id="view-button-container" className="pm0">
        <div className="button-box fbc sel">
          <i className="fas fa-question fa-3x"
             onClick={() => {buttonSwitch("info")}}></i>
        </div>
        <div className="button-box fbc">
          <i className="fas fa-gamepad fa-3x"
             onClick={() => {buttonSwitch("game")}}></i>
        </div>
      </section>

      <section className="view-container pm0">

        <div className="ge-container pm0 shift-up">
          <div className="gameplay-example">
            <div className="fbc">
              <h4 className="ge-header fbc">How do I earn Bragging Rights?</h4>
            </div>
            <div className="ge-box b-s pm0 geb1">
              <div className="ge-description b-s fbc">Setup a game with a few clicks</div>
            </div>
            <div className="ge-box b-s pm0 geb2">
              <div className="ge-description b-s fbc">Answer the questions as they come</div>
            </div>
            <div className="ge-box b-s pm0 geb3">
              <div className="ge-description b-s fbc">See who won Bragging Rights</div>
            </div>
          </div>
        </div>

        <section className="start-game-container pm0 shift-right">
          <div className="start-game-section fbc">
            <h4 className="fbc">Quick Launch</h4>
            <button className="start-game-button fbc pointy"
                    onClick={() => {toggleGames(true)}}>
              <p className="pm0"><strong>Are you a GameMaster??</strong></p>
              <p className="pm0">Host A Game</p>
            </button>
            <button className="start-game-button fbc pointy">
              <Link to="/join" className="link fbc">
                <p className="pm0"><strong>Have a Code??</strong></p>
                <p className=" pm0">Join A Game</p>
              </Link>
            </button>
            <button className="browse-button fbc pointy"
                    onClick={() => {toggleGames(true)}}>
              <p className="pm0">Browse Games</p>
            </button>
          </div>

          <div className="hth-container pm0">
            <div className="how-to-host">
              <h4 className="hth-header pm0 fbc">Want to Host a Game?</h4>
              <div className="how-to-box htb1 b-s">
                <span className="htb-num">1</span>
                <p>Choose "GameMaster" Option Above</p>
              </div>
              <div className="how-to-box htb2 b-s">
                <span className="htb-num">2</span>
                <p>Select A Game</p>
              </div>
              <div className="how-to-box htb3 b-s">
                <span className="htb-num">3</span>
                <p>Invite Friends!</p>
              </div>
            </div>
          </div>
        </section>

        <Games showGames={showGames}
               handleToggleGames={toggleGames}/>

      </section>

    </section>
  )
}
