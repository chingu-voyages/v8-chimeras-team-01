import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import history from '../../History.js';
import Peer from 'peerjs';
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
  *
  */

  state = {
    peer: new Peer(null, {
      debug: 2
    }),
    conn: null,
    players: [],
    id: '',
    playersUpdated: false,
    me: null,
    users: {},
    questions: [],
    currentQ: 0,
    chosenAnswer: '',
    readyLeaderBoard: false,
    readyResults: false,
    whichGame: ''
  }




  // Connection functions
  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate() {

    if (this.state.readyToSend === true) {
      this.sendUserObject();
      this.setState({ readyToSend: false });
    }

  }

  initialize = () => {

    this.state.peer.on('open', (id) => {
      this.setState({ id })

    });

    this.state.peer.on('connection', (c) => {
      this.setState({ conn: c });
      let players = [...this.state.players];
      players.push(this.state.conn);
      this.setState({ players });
      this.ready()
    });

    this.state.peer.on('disconnected', () => {
      this.state.peer.reconnect();
    });

    this.state.peer.on('close', () => {
      this.setState({ conn: null });
    });

    this.state.peer.on('error', (err) => {
      console.log(err);
    })
  }

  ready = () => {
    this.state.conn.on('data', (data) => {
      this.handleReceivedData(data);
    })

    this.state.conn.on('close', () => {
      let playerArray = this.state.players.filter( obj => obj.open);
      this.setState({ players : playerArray });
      this.setState({ conn: null });
    })
  }


  handleReceivedData = (data) => {
    switch (data) {

      default:
        this.catchOthers(data);
        break;
    };
  }

  catchOthers = (data) => {
    if (data.individualResults) {
      this.updateResults(data);
    } else if (data.initialMe) {
      this.initiateUsers(data);
    }
  }
  //End connection functions


  // Initialize  Host And Players
  initiateHostUsers = () => {
    let username = this.state.me.userName;
    let scoreObj = { [username]: this.state.me.myScore };
    this.setState({ users: scoreObj });
  }

  initiateUsers = (data) => {
    this.updatePlayersScores(data.initialMe.userName, data.initialMe.myScore);
    this.state.players.forEach(conn => {
      let obj = { usersObject: this.state.users };
      conn.send(obj);
    });
    this.state.players.forEach(conn => {
      let whichGame = { whichGame: this.state.whichGame };
      conn.send(whichGame);
    });
  }
  // End Initialize Host And Players functions



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
    // To Do Clear all players and host scores
    this.setState({ questions: game.questions });
    this.setState({ whichGame: game.id});
  }

  /**
   * @method sendAnswer - Function used to send computed answer to the Host.
   *
   * @memberof Questions
   */
  sendAnswer = (correct, answer) => {
    // if there are no players connected, single player mode
    //show leaderboard push button
    // if last questions run
    if (this.state.players.length === 0) {

      if (this.state.questions.length === this.state.currentQ + 1) {
        this.setState({ readyResults: true })
      } else {
        this.setState({ readyLeaderBoard: true });
      }
      //update own score in users object
      this.initiateHostUsers();
    }
  }

  updateResults = (data) => {

    this.updatePlayersScores(data.individualResults.userName, data.individualResults.myScore);

    //check if all results are received on initial join
    if (Object.keys(this.state.users).length === this.state.players.length) {
      //trigger host update users with own score
      //by setting playersUpdated to true
      this.updateHost();
    }
  }

  updateHost = () => {

    this.setState({
      users: {
        ...this.state.users,
        [this.state.me.userName]: this.state.me.myScore,
      },
    });
    this.setState({ playersUpdated: false });

    this.setState({ readyToSend: true });
  }

  updatePlayersScores = (user, score) => {
    this.setState({
      users: {
        ...this.state.users,
        [user]: score,
      },
    });
  }


  clearUsers = () => {
    this.setState({ users: {} })
  }

  handleLeaderBoardTransition = () => {
    this.state.players.forEach(conn => {
      conn.send("go Leaderboard");
    });
  }

  handleGetStarted = () => {
    this.state.players.forEach(conn => {
      conn.send("start");
    });
    this.clearUsers();

  }

  handleUsername = (e) => {
    e.preventDefault();
    let myName = e.target.userName.value;
    let obj = { myScore: 0, userName: myName }
    this.setState({ me: obj }, () => this.initiateHostUsers());
  }

  updateMyScore = (score) => {
    var obj = { myScore: score, userName: this.state.me.userName }
    this.setState({ me: obj })
  }

  sendUserObject = () => {
    this.state.players.forEach(conn => {
      let obj = { usersObject: this.state.users };
      conn.send(obj);
      this.setState({ readyToSend: false });
    });
    this.readyLeaderBoard();
  }

  goNextQuestion = () => {
    this.state.players.forEach(conn => {
      conn.send("go Next Question");
    });
    this.pushLocation("/host/questions");
    this.clearUsers();
  }

  readyLeaderBoard = () => {
    if (this.state.questions.length === this.state.currentQ + 1) {
      this.setState({ readyResults: true })
    } else {
      this.setState({ readyLeaderBoard: true });
    }
  }

  goLeaderboard = () => {
    this.state.players.forEach(conn => {
      conn.send("go Leaderboard");
    });
    this.pushLocation("/host/leaderboard");
    this.unreadyLeaderBoard();
  }

  goResults = () => {
    this.state.players.forEach(conn => {
      conn.send("Game Over");
    });
    this.pushLocation("/host/results");
    this.unreadyLeaderBoard();
  }

  unreadyLeaderBoard = () => {
    this.setState({ readyLeaderBoard: false, readyResults: false });
  }

  /**
   * @function copyToClipboard
   * @description [copies selection to clipboard.]
   */
  copyToClipboard = (target) => {
    let text = document.getElementById(target).innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied!");
    });

  }

  render() {

    return (
      <div id="host-container">

        <section className="host-header">
          {
            this.state.me ?
              <h3> User Name: <span className="orange">
                {this.state.me.userName}
              </span></h3> :
              <div id="host-userName-form" className="fbc">
                <form className="fbc"
                  onSubmit={this.handleUsername}>
                  <input type="text"
                    className="huf-input"
                    name="userName"
                    placeholder='What should we call you?' />
                  <button type='submit'
                    className="huf-button pointy">Submit</button>
                </form>
              </div>
          }

          <h3>Game ID:
            <span className="orange pointy"
              id="game-id"
              onClick={() => { this.copyToClipboard("game-id") }}> {this.state.id}
            </span></h3>
          <h3 className="hh-subtext pm0">click to copy, share so friends can join</h3>
        </section>

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
            render={() => <Instructions
              getStarted={<GetStarted handleGetStarted={this.handleGetStarted} />}
              users={this.state.users} />}
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
                updateHost={this.updateHost}
                playersUpdated={this.state.playersUpdated}
                goLeaderboard={this.goLeaderboard}
                readyLeaderBoard={this.state.readyLeaderBoard}
              />
            } />

          <Route path="/host/leaderboard"
            render={(props) =>
              <LeaderBoard {...props}
                users={this.state.users}
                hostReady={true}
                handleIncrementQ={this.incrementQ}
                nextQuestion={<NextQuestion
                  goNextQuestion={this.goNextQuestion}
                />}

              />
            } />

          <Route path="/host/results"
            render={(props) =>
              <Results {...props}
                users={this.state.users} />
            } />

        </Switch>
        {(!!this.state.readyLeaderBoard) && <button className="host-next__btn" onClick={this.goLeaderboard}>go leaderboard</button>}
        {(!!this.state.readyResults) && <button className="host-next__btn" onClick={this.goResults}>go results</button>}

      </div >

    )
  }
}

export default Host;
