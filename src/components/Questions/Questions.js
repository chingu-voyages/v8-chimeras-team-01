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
   * @method timer - Decrements the time in state.
   */
  const timer = () => {
    // Will decrement time in state until 0, then push to Leaderboard
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
