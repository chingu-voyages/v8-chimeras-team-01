import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import history from '../../History.js';
import withPeerJs from '../HOCs/withPeerJs';
import Questions from '../Questions';
import Games from '../Games';
import Instructions from '../Instructions';
import LeaderBoard from '../LeaderBoard';
import Results from '../Results';


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
    constructor(props) {
      super(props);
      this.state = {
        me: {
          userName: "Clyde",
          id: '124v34b6',
          score: 120
        },
        users: [
          {
            userName: "Inky",
            id: '34vtt1fc',
            score: 50
          },
          {
            userName: "Blinky",
            id: '34vyv34',
            score: 5
          },
          {
            userName: "Pinky",
            id: '124v34vvq',
            score: 10
          },
          {
            userName: "Clyde",
            id: 'f431fvf4v',
            score: 120
          }
        ],
        questions: [],
        currentQ: 0,
        time: 10,
        chosenAnswer: '',
        message: '',
      }
    };

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
      this.setState({ currentQ: (cQ+1) })
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
    sendAnswer = (correct) => {

        // Display data being sent to the host
        console.log({
            correct,
            username: this.state.username
        })

        // Stoping the timer
        clearInterval(this.timer)

        // At this point we should be waiting for a response from the host.
        console.log('Waiting for signal from host');

        // A loader is put in place while we wait from the Host
        let imageQuestion = document.querySelector('.image-question')
        imageQuestion.classList.add('hide');

        let loader = document.querySelector('.loader');
        loader.classList.remove('hide')

        // Mimicking response from Host
        setTimeout(() => {

            // Highlighting the correct answer
            let correct = document.querySelector('.correct')
            correct.classList.add('highlight')

        }, 3000)

    }

    /**
     * @method timer - A timer to countdown.
     *
     * @memberof Questions
     */
    timer = () => {
        // Timer will run until time is 0 and then the
        // answer will be sent to the Host
        this.timer = setInterval(() => {
            this.setState({ time: this.state.time - 1 },

                () => {

                    if (this.state.time === 0) {

                        this.sendAnswer()

                    }
                }
            )

        }, 1000)
    }

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

    render() {

      return (
        <div id="host-container">
          <h1>
              Host
          </h1>
          <h3>connection ID: {this.props.data.id}</h3>

          <br />
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
            }/>

            <Route path="/host/instructions" component={Instructions} />

            <Route path="/host/questions"
                   render={(props) =>
                    <Questions {...props}
                      question={this.state.questions[this.state.currentQ]}
                      handleIncrementQ={this.incrementQ}
                      pushLocation={this.pushLocation} />
            }/>

            <Route path="/host/leaderboard"
              render={(props) =>
               <LeaderBoard {...props}
                 users={this.state.users}/>
            }/>

            <Route path="/host/results"
                render={(props) =>
                 <Results {...props}
                   users={this.state.users}/>
              }/>

          </Switch>

        </div >

      )
    }
}

export default withPeerJs(Host);
