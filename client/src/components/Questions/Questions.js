import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import './index.css';
import Loader from '../Loader';

export default function Questions({ updateMyScore, myScore, sendAnswer, question, onQ, totalQ, handleIncrementQ, pushLocation, playersUpdated, updateHost, readyLeaderBoard, goLeaderboard }) {


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

  const [localScore, setLocalScore] = useState(myScore);
  const [correct, setCorrect] = useState('wrong');
  const [answer, setAnswer] = useState('');


  const handleChoice = (event, correct, answer) => {
    preventClicks(event);
    setCorrect(correct);
    setAnswer(answer);
    let updatedScore = 0
    if (correct === "correct") {
      updatedScore = localScore + (5 * time);
    } else {
      updatedScore = localScore;
    }
    setLocalScore(updatedScore);
    updateMyScore(updatedScore)
  }

  /**
   * [time Hook]
   * @method time
   * @description [Hook to set initial time in timer and method to update that count]
   */
  const [time, setTime] = useState(10);

  /**
   * @function highlightCorrect [Highlights Answer marked as correct]
   */
  const highlightCorrect = () => {
    let correct = document.querySelector('.correct');
    correct.classList.add('highlight');
  }


  /**
   * @function timer [Decrements the time in state and pushes to Leaderboard URL except last question, then pushes to Results URL]
   */
  const timer = () => {
    if (time === 0) {
      let newTime = (time - 1);
      setTime(newTime);

      // Highlighting the correct answer
      highlightCorrect();

      // send answers to host regardless
      sendAnswer(correct, answer, localScore)

    } else if (time === -15) {
      updateHost();

      let newTime = (time - 1);
      setTime(newTime);

    } else {
      let newTime = (time - 1);
      setTime(newTime);
    }

  }

  /* Once user clicks answer, prevent more answers from being chosen */
  /**
   * @function preventClicks [finds all Answers and prevents further clicks]
   */
  const preventClicks = (e) => {
    e.target.classList.add('selected');

    let allAnswers = document.getElementsByClassName('box');
    [...allAnswers].forEach(element => element.classList.add('no-clicks'));
  }

  return (

    <div id="questions" className="fbc">
      <h1 className="questions__title">Question {onQ} of {totalQ} </h1>

      <div className='image-wrapper fbc'>
        {time <= 0 ? <Loader /> :
          <>
            <img className='outline image-question' alt='of question' src={question.i}></img>
            <div className="question__timer">Timer {time}</div>
          </>

        }
      </div>

      <div className='text-center'>
        <h2 className='question__display'>{question.q}</h2>
      </div>

      <div className='answers-wrapper'>
        {
          question.a.map((answer, i) => {
            if (answer !== question.c) {
              return <Answer correct={'wrong'}
                answer={answer}
                handleChoice={handleChoice}
                key={i} />;
            } else {
              return <Answer correct={'correct'}
                answer={answer}
                handleChoice={handleChoice}
                key={i} />;
            }
          })
        }
      </div>

    </div >
  )
}
