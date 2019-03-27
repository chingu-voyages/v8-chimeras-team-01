import React, { Component } from 'react';
import Answer from './Answer';
import './index.css';

class Questions extends Component {

  state = {
    time: 10,
    question: 'The Question ?',
    answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    correctAnswer: 'Answer 2',
    chosenAnswer: '',
    username: 'Player1',
    totalQuestions: 10,
    counter: 1
  }

  sendAnswer = (correct) => {

    console.log({
      correct,
      username: this.state.username
    })

    clearInterval(this.timer)
    console.log('Waiting for signal from host');
    let imageQuestion = document.querySelector('.image-question')
    imageQuestion.classList.add('hide');
    let loader = document.querySelector('.loader');
    loader.classList.remove('hide')

    setTimeout(() => {
      let correct = document.querySelector('.correct')
      correct.classList.add('highlight')

    }, 3000)

  }

  timer = () => {
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

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    this.timer();
  }

  render() {
    return (
      <div id="questions">

        <h1>Question {this.state.counter} of {this.state.totalQuestions} </h1>
        <div className='image-wrapper'>
          <img className='outline image-question' alt='of question' src='https://picsum.photos/200'></img>
          <img className='loader hide' src='./images/loader.gif' />
          <div>Timer {this.state.time}</div>
        </div>
        <div className='center'>
          <h1 className='inline'>{this.state.question}</h1>
        </div>
        <div className='answers-wrapper'>
          {
            this.state.answers.map((answer, i) => {
              if (answer !== this.state.correctAnswer) {
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
