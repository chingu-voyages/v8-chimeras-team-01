import React, { Component } from 'react';
import Answer from './Answer';
import './index.css';

/**
 *
 *
 * @class Questions
 * @extends {Component}
 */
class Questions extends Component {

  /**
  *
  *
  * @property { Number } time - A number to countdown from.
  * @property { String } question  - Hold the current question.
  * @property { Array }  answers  - An array of possible answers.
  * @property { String } correctAnswer  - The correct answer to the question.
  * @property { String } chosenAnswer - Answer chosen by the player.
  * @property { String } username - Username of the player.
  * @property { Number } totalQuestions - Indicates how many questions there are in total.
  * @property { Number } counter - Indicates which question we are currently at.
  *
  */
  state = {
    time: 10,
    question: this.props.question,
    answers: this.props.answers,
    correctAnswer: this.props.correctAnswer,
    chosenAnswer: '',
    username: 'Player1',
    totalQuestions: 10,
    counter: 1
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

            this.props.pushLocation("leaderboard");

          }
        }
      )

    }, 1000)
  }

  componentDidMount() {
    this.timer();
  }

  render() {
    const { counter, totalQuestions, time, question, answers, correctAnswer } = this.state;
    return (

      <div id="questions">

        <h1>Question {counter} of {totalQuestions} </h1>

        <div className='image-wrapper'>
          <img className='outline image-question' alt='of question' src='https://picsum.photos/200'></img>
          <img className='loader hide' src='./images/loader.gif' alt="Loading" />
          <div>Timer {time}</div>
        </div>

        <div className='center'>
          <h1 className='inline'>{question}</h1>
        </div>

        <div className='answers-wrapper'>
          {
            answers.map((answer, i) => {
              if (answer !== correctAnswer) {
                return <Answer correct={'wrong'} sendAnswer={this.sendAnswer} answer={answer} key={i} />;
              } else {
                return <Answer correct={'correct'} sendAnswer={this.sendAnswer} answer={answer} key={i} />;
              }
            })
          }
        </div>

      </div>
    )
  }
}

export default Questions;
