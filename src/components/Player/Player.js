import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Peer from 'peerjs';

import history from '../../History.js';
import Questions from '../Questions';
import Results from '../Results';
import LeaderBoard from '../LeaderBoard';
import Instructions from '../Instructions';
import Join from './Join';

import './index.css';

/**
 *
 *
 * @class Host
 * @extends {Component}
 */
class Player extends Component {

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
    id: '',
    me: {
      userName: "",
      myScore: 0
    },
    users: {},
    questions: [],
    currentQ: 0,
    time: 10,
    isConnected: false,
    input: '',
    conn: '',
    whichGame: ''
  }

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {

    this.state.peer.on('open', (id) => {
      console.log("ID: " + this.state.peer.id);
      this.setState({ id })

    });

    this.state.peer.on('disconnected', () => {
      //handle connection message
      console.log("Connection lost. Please reconnect");
      this.state.peer.reconnect();
    });

    this.state.peer.on('close', () => {
      this.setState({ conn: null });
      console.log('Connection destroyed');
    });

    this.state.peer.on('error', (err) => {
      console.log(err);
    })
  }

  loadQuestions(whichGame) {
    return fetch(`/api/questions/${whichGame}`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(data =>
        this.setState({
          questions: data.questions
        })
      )
      .catch(err =>
        console.log(err)
      );
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
  sendAnswer = (correct, answer, localScore) => {
    //Send data to Host
    this.sendChosenAnswer(correct, answer, localScore);
  }

  /**
   * @method sendChosenAnswer - Function used to send slected answer to the Host.
   */

  sendChosenAnswer = (correct, answer, localScore) => {
    if (this.state.conn.open) {
      let msg = { individualResults: this.state.me };
      this.state.conn.send(msg);
      console.log("Sent: " + msg);
    }
  }

  handleConnection = (id) => {
    let conn = this.state.peer.connect(id, {
      reliable: true
    });

    this.setState({ conn, isConnected: true }, () => {
      this.finishConnections();
    })


  }

  finishConnections = () => {

    this.state.conn.on('open', () => {
      console.log("Connected to: " + this.state.conn.peer);
      let firstMe = { initialMe: this.state.me };
      this.state.conn.send(firstMe);
    });

    this.state.conn.on('data', (data) => {
      console.log(data);
      this.handleReceivedData(data);
    });

    this.state.conn.on('close', () => {
      console.log("Connection closed");
    });

  }

  handleReceivedData = (data) => {
    switch (data) {
      case "start":
        this.pushLocation("/player/questions");
        break;
      case "go Leaderboard":
        this.pushLocation("/player/leaderboard");
        break;
      case "go Next Question":
        this.pushLocation("/player/questions");
        break;
      case "Game Over":
        this.pushLocation("/player/results");
        break;
      case "Rematch":
        console.log("handle rematch here");
        break;
      default:
        this.catchOthers(data);
        console.log(data);
        break;
    };
  }

  /**
   * @method catchOthers - Function used to receive score/results from host and update them
   *
   *
   */

  catchOthers = (data) => {

    if (data.usersObject) {
      this.updateUsersObject(data);
    } else if (data.whichGame) {
      let whichGame = data.whichGame
      this.loadQuestions(whichGame);
    }
  }

  updateUsersObject = (data) => {
    this.setState({ users: data.usersObject })
  }

  updateUsername = (myName) => {
    let obj = { userName: myName, myScore: 0 };
    this.setState({ me: obj });
  }

  updateMyScore = (score) => {
    var obj = { myScore: score, userName: this.state.me.userName };
    this.setState({ me: obj });
  }

  render() {

    return (
      <div>
        <section className="player-header">
          {
            this.state.me.userName ?
              <h3> User Name: <span className="orange">
                {this.state.me.userName}
              </span></h3> :
              <h3><span className="orange">Enter a User Name</span></h3>


          }
        </section>


        < br />
        <Switch>

          <Route path="/player/join" render={() => <Join pushLocation={this.pushLocation} updateUsername={this.updateUsername} handleConnection={this.handleConnection} />} />

          <Route path="/player/instructions"
            render={() => <Instructions
              users={this.state.users} />} />

          <Route path="/player/questions"
            render={(props) =>
              <Questions {...props}
                question={this.state.questions[this.state.currentQ]}
                onQ={this.state.currentQ + 1}
                totalQ={this.state.questions.length}
                handleIncrementQ={this.incrementQ}
                pushLocation={this.pushLocation}
                sendAnswer={this.sendAnswer}
                updateMyScore={this.updateMyScore}
                myScore={this.state.me.myScore}
              />
            } />

          <Route path="/player/leaderboard"
            render={(props) =>
              <LeaderBoard {...props}
                users={this.state.users}
                handleIncrementQ={this.incrementQ} />
            } />

          <Route path="/player/results"
            render={(props) =>
              <Results {...props}
                users={this.state.users} />
            } />

        </Switch>
      </div >

    )
  }
}

export default Player;
