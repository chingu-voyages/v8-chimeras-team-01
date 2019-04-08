import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//Components
import Games from '../Games';
import Results from '../Results';
import Questions from '../Questions';
import LeaderBoard from '../LeaderBoard';
import Instructions from '../Instructions';
import history from '../../History.js';

class HostShell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      me: {
        userName: "Clyde",
        id: '124v34b6',
        score: 120
      },
      users: {
        Inky: 50,
        Blinky: 5,
        Pinky: 10,
        Clyde: 120,
      },
      questions: [],
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
  /* Set Game */
  setGame = (game) => {
    this.setState({ questions: game.questions });
  }

  render() {
    return (
      <div id="host-container">

        <div>
          <h1> Checking It </h1>
        </div>

        <Switch>

          <Route path="/host/games"
            render={(props) =>
             <Games {...props}
               showGames={true}
               handleSetGame={this.setGame}
               pushLocation={this.pushLocation} />
          }/>

          <Route path="/host/instructions" component={Instructions} />

          <Route path="/host/questions"
                 render={(props) =>
                  <Questions {...props}
                    question={this.state.questions[this.state.currentQ]}
                    onQ={this.state.currentQ + 1}
                    totalQ={this.state.questions.length()}
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

        </Switch>

      </div>
    )
  }
}

export default HostShell;
