import React from 'react';
import Answer from './Answer';
import './index.css';

/**
 *
 *
 * @class Questions
 * @extends {Component}
 */
const Questions = (props) => {
  // values
  const { counter, totalQuestions, time, question, answers, correctAnswer } = props;
  // methods 
  const { sendAnswer } = props;

  return (

    <div id="questions">

      <h1>Question {counter} of {totalQuestions} </h1>

      <div className='image-wrapper'>
        <img className='outline image-question' alt='of question' src='https://picsum.photos/200'></img>
        <img alt='loader running' className='loader hide' src='./images/loader.gif' />
        <div>Timer {time}</div>
      </div>

      <div className='center'>
        <h1 className='inline'>{question}</h1>
      </div>

      <div className='answers-wrapper'>
        {
          answers.map((answer, i) => {
            if (answer !== correctAnswer) {
              return <Answer correct={'wrong'} sendAnswer={sendAnswer} answer={answer} key={i} />;
            } else {
              return <Answer correct={'correct'} sendAnswer={sendAnswer} answer={answer} key={i} />;
            }
          })
        }
      </div>

    </div>
  )
}

export default Questions;
