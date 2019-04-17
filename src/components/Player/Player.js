import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import withPeerJs from '../HOCs/withPeerJs';

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
  * @property { String } message - content of message to be sent.
  *
  */
  state = {
    me: {
      userName: "",
      myScore: 0
    },
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
    time: 10,
    message: '',
    isConnected: false,
    input: '',
    conn: '',
    currentResults: { individualResults: null }
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

    // At this point we should be waiting for a response from the host.
    // TODO: Add function to gather info from players and send players object beck to players with updated results
    console.log('Waiting for signal from host');

    // Mimicking response from Host
    setTimeout(() => {

      // Highlighting the correct answer
      let correct = document.querySelector('.correct');
      correct.classList.add('highlight');

    }, 3000)

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

  handleInputChange = ({ target }) => {

    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleMessage = () => {

    this.state.conn.send(this.state.message)

  }
  handleConnection = (id) => {
    let conn = this.props.data.peer.connect(id, {
      reliable: true
    });

    this.setState({ conn, isConnected: true }, () => {
      this.finishConnections();
    })


  }

  finishConnections = () => {

    this.state.conn.on('open', () => {
      console.log("Connected to: " + this.state.conn.peer);
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
        this.start();
        break;
      case "go Leaderboard":
        this.goLeaderboard();
        console.log("do something to transition to Leaderboard");
        break;
      case "go Next Question":
        this.goNextQuestion();
        break;
      case "Game Over":
        console.log("send to results screen");
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
    }
    console.log(this.state.users);
  }

  updateUsersObject = (data) => {
    this.setState({ users : data.usersObject})
  }

  updateUsername = (myName) => {
    let obj = { userName : myName, myScore: 0 };
    this.setState({ me: obj });
    console.log(this.state.me.userName);
  }

  updateMyScore = (score) => {
    var obj = { myScore: score, userName: this.state.me.userName };
    this.setState({ me: obj });
  }

  start = () => {
    this.pushLocation("/player/questions");
    console.log("push to questions");
  }

  goLeaderboard = () => {
    this.pushLocation("/player/leaderboard");
    console.log("push to leaderboard");
  }

  goNextQuestion = () => {
    this.pushLocation("/player/questions");
    console.log("push to next question");
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

          <Route path="/player/instructions" component={Instructions} />

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
                handleIncrementQ={this.incrementQ}/>
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

export default withPeerJs(Player);
