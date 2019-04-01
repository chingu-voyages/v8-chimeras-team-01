import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//Components
import Results from '../Results';
import Questions from '../Questions';
import LeaderBoard from '../LeaderBoard';
import Instructions from '../Instructions';
import history from '../../History.js';

class HostShell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: "",
        score: 0
      },
      question: "First Question",
      answers: ['First', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctAnswer: 'Answer 2',
      rankings: []
    }
  };

  pushLocation = (path) => {
    history.push(`/host/${path}`);
  };

  render() {
    return (
      <div id="host-container">

        <div>
          <h1> Checking It </h1>
        </div>

        <Switch>

          <Route path="/host/instructions" component={Instructions} />

          <Route path="/host/questions"
                 render={(props) =>
                  <Questions {...props}
                    question={this.state.question}
                    answers={this.state.answers}
                    correctAnswer={this.state.correctAnswer}
                    pushLocation={this.pushLocation} />
          }/>

        <Route path="/host/leaderboard" component={LeaderBoard} />

          <Route path="/host/results" component={Results} />

        </Switch >

      </div>
    )
  }
}

export default HostShell;
