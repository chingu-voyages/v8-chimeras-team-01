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
  *
  */
  state = {
    me: null,
    users: {},
    questions: [],
    currentQ: 0,
    chosenAnswer: '',
    readyLeaderBoard: false
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

    // console.log('Waiting for signal from players');
    //
    // // Pausing while others are still answering Qs
    //  setTimeout(() => {
    //
    //    // Highlighting the correct answer
    //    let correct = document.querySelector('.correct');
    //    correct.classList.add('highlight');
    //
    //  }, 1000)

     // if there are no players connected, single player mode
     if(this.props.data.players.length === 0){
       //show leaderboard push button
       this.setState({ readyLeaderBoard : true });
       //update own score in users object
       let username = this.state.me.userName;
       let scoreObj = {[username]: this.state.me.myScore };
       this.setState({ users : scoreObj });
     }
  }

  handleLeaderBoardTransition = () => {

    this.props.data.players.forEach(conn => {
      conn.send("go Leaderboard");
    });

  }

  handleGetStarted = () => {

    this.props.data.players.forEach(conn => {
      conn.send("start");
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

  updateHost = () => {
    this.setState({
      users: {
        ...this.props.data.users,
        [this.state.me.userName]: this.state.me.myScore,
      },
    });
    this.setState({
      users: Object.assign({}, this.props.data.users, {
        [this.state.me.userName]: this.state.me.myScore,
      }),
    });
    this.props.resetPlayersUpdated();
    this.setState({ readyToSend : true });
  }

  componentDidUpdate() {
    if(this.state.readyToSend === true) {
      this.sendUserObject();
    }

  }

  sendUserObject = () => {
    this.props.data.players.forEach(conn => {
      let obj = {usersObject: this.state.users};
      conn.send(obj);
      this.setState({ readyToSend : false });
      console.log("sent users object", obj);
    });
    this.readyLeaderBoard();
  }

  readyLeaderBoard = () => {
    this.setState({ readyLeaderBoard : true });
  }

  unreadyLeaderBoard = () => {
    this.setState({ readyLeaderBoard : false });
  }

  goNextQuestion = () => {
      this.props.data.players.forEach(conn => {
        conn.send("go Next Question");
      });
      this.pushLocation("/host/questions");
    }

    goLeaderboard = () => {
      this.props.data.players.forEach(conn => {
        conn.send("go Leaderboard");
      });
      this.pushLocation("/host/leaderboard");
      this.unreadyLeaderBoard();
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
                         placeholder='What should we call you?'/>
                  <button type='submit'
                          className="huf-button pointy">Submit</button>
                </form>
              </div>
          }

          <h3>Game ID:
            <span className="orange pointy"
                  id="game-id"
                  onClick={() => {this.copyToClipboard("game-id")}}> {this.props.data.id}
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
            render={() => <Instructions getStarted={<GetStarted handleGetStarted = {this.handleGetStarted}/>} />}
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
                playersUpdated={this.props.data.playersUpdated}
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
                    goNextQuestion = {this.goNextQuestion}
                   />}

              />
            } />

          <Route path="/host/results"
            render={(props) =>
              <Results {...props}
                users={this.state.users} />
            } />

        </Switch>
        {(this.state.readyLeaderBoard === true) && <button onClick={this.goLeaderboard}>go leaderboard</button>}

      </div >

    )
  }
}

export default withPeerJs(Host);
