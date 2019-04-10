import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import history from '../../History.js';
import withPeerJs from '../HOCs/withPeerJs';
import Questions from '../Questions';
import Games from '../Games';
import Instructions from '../Instructions';
import LeaderBoard from '../LeaderBoard';
import Results from '../Results';

import GetStarted from './GetStarted';
import NextQuestion from './NextQuestion';


import './index.css';

/**
 * @class Host
 * @extends {Component}
 */
class Host extends Component {

  /**
  * @property { Object } me - User in this instance of game.
  * @property { Array } users - Array of user objects.
  * @property { Array } questions - Array of questions and answers.
  * @property { Array }  answers - An array of possible answers.
  * @property { Number } currentQ - Index of current question.
  * @property { Number } time - How many seconds to set timer.
  * @property { String } chosenAnswer - String holding chosen answer.
  * @property { String } message - content of message to be sent.
  *
  */
  state = {
    me: null,
    users: {
      Inky: 50,
      Blinky: 5,
      Pinky: 10,
      Clyde: 120,
    },
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
    ],
    currentQ: 0,
    chosenAnswer: '',
    message: '',
    resultsObject: { playerResults: null }
  }

  /* PUSH URL */
  /**
   * @function pushLocation
   * @arg {String}
   * @description [Takes in a string that will be pushed as a URL path in the history stack, making the app 'navigate' to that URL and mount any corrosponding components.]
   */
  pushLocation = (path) => {
    history.push(`${path}`);
  };

  /* Increment Current Q */
  /**
   * @function incrementQ
   * @description [Takes in number representing index of current question in questions array and adds one, in order to get next question in array.]
   */
  incrementQ = () => {
    let cQ = this.state.currentQ;
    this.setState({ currentQ: (cQ + 1) })
  }

  /* Set Game */
  /**
   * @function setGame
   * @description [Takes in questions and answers from game selected in Games component and places them in the questions array in state.]
   */
  setGame = (game) => {
    this.setState({ questions: game.questions });
  }


  /**
   * @method sendAnswer - Function used to send computed answer to the Host.
   *
   * @memberof Questions
   */
  sendAnswer = (correct, answer) => {

    this.setState({ chosenAnswer: answer });
    // TODO: Handle setting own state before moving on

    // Display data being sent to the host
    console.log({
      correct,
      answer,
      username: this.state.username
    })

    // At this point we should be waiting for a response from the host.
    // TODO: Add function to gather info from players and send players object beck to players with updated results
    console.log('Waiting for signal from host');

    // Mimicking response from Host
    // setTimeout(() => {

    //   // Highlighting the correct answer
    //   let correct = document.querySelector('.correct');
    //   correct.classList.add('highlight');

    // }, 3000)

  }

  handleLeaderBoardTransition = () => {

    this.props.data.players.forEach(conn => {
      conn.send("go Leaderboard");
      console.log("pushing to leaderboard");
    });

  }

  // TODO: Handle data from players (SWITCH)

  // TODO: Remove after game is working
  handleInputChange = ({ target }) => {

    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleMessage = () => {

    this.props.data.players.forEach(conn => {
      conn.send(this.state.message);
    });

  }

  handleUsername = (e) => {
    e.preventDefault();
    let myName = e.target.userName.value;
    let obj = { myScore: 0, userName: myName }
    this.setState({ me: obj })
  }

  updateMyScore = (score) => {
    var obj = { myScore: score, userName: this.state.me.userName }
    this.setState({ me: obj })
  }

  render() {

    return (
      <div id="host-container">

        <section className="host-header">
          {
            this.state.me ?
              <h3> UserName: {this.state.me.userName}</h3> :
              <div id="host-userName-form" className="fbc">
                <form className="fbc"
                      onSubmit={this.handleUsername}>
                  <input type="text"
                         className="huf-input"
                         name="userName"
                         placeholder='What should we call you?'/>
                  <button type='submit'
                          className="huf-button pointy">Submit</button>
                </form>
              </div>
          }

          <h3>Game ID: {this.props.data.id}</h3>
          <h3>Your players will need this to join your game</h3>
        </section>

        <br />
        {/* TODO: REMOVE THIS WHEN GAME IS RUNNING */}
        <input name='message' value={this.state.message} onChange={this.handleInputChange} />
        <button onClick={this.handleMessage} >Send Message</button>
        <br />

        <Switch>

          <Route path="/host/games"
            render={(props) =>
              <Games {...props}
                showGames={true}
                handleSetGame={this.setGame}
                pushLocation={this.pushLocation} />
            } />

          <Route path="/host/instructions"
            render={() => <Instructions getStarted={<GetStarted />} />}
          />

          <Route path="/host/questions"
            render={(props) =>
              <Questions {...props}
                question={this.state.questions[this.state.currentQ]}
                onQ={this.state.currentQ + 1}
                totalQ={this.state.questions.length}
                pushLocation={this.pushLocation}
                sendAnswer={this.sendAnswer}
                myScore={this.state.me.myScore}
                updateMyScore={this.updateMyScore}
              />
            } />

          <Route path="/host/leaderboard"
            render={(props) =>
              <LeaderBoard {...props}
                users={this.state.users}
                hostReady={true}
                handleIncrementQ={this.incrementQ}
                nextQuestion={<NextQuestion />}

              />
            } />

          <Route path="/host/results"
            render={(props) =>
              <Results {...props}
                users={this.state.users} />
            } />

        </Switch>

      </div >

    )
  }
}

export default withPeerJs(Host);
