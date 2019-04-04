import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import './index.css';

export default function Question({ question, onQ, totalQ, handleIncrementQ, pushLocation }) {


  /**
   * [useEffect Hook]
   * @method  timeInterval
   * @description  [Hook to start/stop timer on mount/unmount]
   * @return {function} [Cleans up on un-mount by clearing interval]
   */
  useEffect(() => {
    const timeInterval = setInterval(() => timer(), 1000)
    return () => {
      clearInterval(timeInterval);
    }
  })


  /**
   * [time Hook]
   * @method time
   * @description [Hook to set initial time in timer and method to update that count]
   */
  const [time, setTime] = useState(20);


  /**
   * [isLastQ]
   * @param  [Holds boolean, true if this is the last quesiton in the array, false otherwise]
   * @return {Boolean}
   */
  const isLastQ = (onQ === totalQ) ? true : false;


  /**
   * @function timer [Decrements the time in state and pushes to Leaderboard URL except last question, then pushes to Results URL]
   */
  const timer = () => {
          if (time === 0) {
            if (!isLastQ) {
              handleIncrementQ();
              pushLocation("/host/leaderboard");
            } else {
              pushLocation("/host/results");
            }
            handleIncrementQ();
            pushLocation(isLastQ ? "/host/results" :"/host/leaderboard");
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
