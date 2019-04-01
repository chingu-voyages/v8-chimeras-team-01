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
      users: [
        {
          userName: "Inky",
          score: 0
        },
        {
          userName: "Blinky",
          score: 5
        },
        {
          userName: "Pinky",
          score: 10
        },
        {
          userName: "Clyde",
          score: 120
        }
      ],
      questions: [
        {
          q: "First Question",
          a: ['First', 'Second', 'Third', 'Fourth'],
          c: 'Second'
        },
        {
          q: "Second Question",
          a: ['Lemon', 'Squirrel', 'Cabinet', 'Lambo'],
          c: 'Lambo'
        },
        {
          q: "Third Question",
          a: ['Ham', 'Turkey', 'Grass', 'Connecticut'],
          c: 'Ham'
        },
      ],
      currentQ: 0
    }
  };

/* PUSH URL */
  pushLocation = (path) => {
    history.push(`${path}`);
  };

  /* Increment Current Q */
  incrementQ = () => {
    let cQ = this.state.currentQ;
    this.setState({ currentQ: (cQ+1) })
  }

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

        </Switch >

      </div>
    )
  }
}

export default HostShell;
