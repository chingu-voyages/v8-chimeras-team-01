import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import './index.css';

/**
 *
 *
 * @class Questions
 * @extends {Component}
 */
export default function Question({ question, onQ, totalQ, handleIncrementQ, pushLocation }) {

  //Hook to start/stop timer on mount/unmount
  useEffect(() => {
    const timeInterval = setInterval(() => timer(), 1000)
    return () => {
      clearInterval(timeInterval);
    }
  })

  //Hook to hold time for timer
  const [time, setTime] = useState(20);

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


  /**
   * @method timer - A timer to countdown.
   */
  const timer = () => {
    // Timer will run until time is 0 and then the
    // user is pushed to Leaderboard
          if (time === 0) {
            handleIncrementQ();
            pushLocation("/host/leaderboard");
          } else {
            let newTime = (time - 1);
            setTime(newTime);
          }
  }

  return (

    <div id="questions">

      <h1>Question {onQ} of {totalQ} </h1>

      <div className='image-wrapper'>
        <img className='outline image-question' alt='of question' src='https://picsum.photos/200'></img>
        <img className='loader hide' src='./images/loader.gif' alt="Loading" />
        <div>Timer {time}</div>
      </div>

      <div className='center'>
        <h1 className='inline'>{question.q}</h1>
      </div>

      <div className='answers-wrapper'>
        {
          question.a.map((answer, i) => {
            if (answer !== question.c) {
              return <Answer correct={'wrong'} answer={answer} key={i} />;
            } else {
              return <Answer correct={'correct'} answer={answer} key={i} />;
            }
          })
        }
      </div>

    </div>
  )
}
