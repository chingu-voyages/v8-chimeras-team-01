import React, { Component } from 'react';
import withPeerJs from '../HOCs/withPeerJs';
import Questions from '../Questions';

import './index.css';

/**
 *
 *
 * @class Host
 * @extends {Component}
 */
class Host extends Component {

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
        question: 'The Question ?',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correctAnswer: 'Answer 2',
        chosenAnswer: '',
        username: 'Player1',
        totalQuestions: 10,
        counter: 1,
        message: '',

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
    componentDidMount() {
        this.timer();
    }

    render() {

        const { counter, totalQuestions, time, question, answers, correctAnswer } = this.state;

        return (
            <div>
                <h1>
                    Host
                </h1>
                <h3>connection ID: {this.props.data.id}</h3>

                <br />
                <input name='message' value={this.state.message} onChange={this.handleInputChange} />
                <button onClick={this.handleMessage} >Send Message</button>
                <br />
                <Questions counter={counter}
                    totalQuestions={totalQuestions}
                    time={time}
                    question={question}
                    answers={answers}
                    correctAnswer={correctAnswer}
                    sendAnswer={this.sendAnswer}
                />
            </div >

        )
    }
}

export default withPeerJs(Host);