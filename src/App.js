import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//Stylesheets
import './App.css';

//Components
import Results from './components/Results';
import Questions from './components/Questions';
import LeaderBoard from './components/LeaderBoard';
import Landing from './components/Landing';
import Instructions from './components/Instructions';
import Games from './components/Games';
import Nav from './components/Nav';
import Host from './components/Host';
import Player from './components/Player';

class App extends Component {

  render() {
    return (
      <div id="top-level-container">
        <Nav />

        <Switch>

          <Route exact path="/" component={Landing} />
          <Route path="/results" component={Results} />
          <Route path="/games" component={Games} />
          <Route path="/instructions" component={Instructions} />
          <Route path="/questions" component={Questions} />
          <Route path="/leaderBoard" component={LeaderBoard} />
          <Route path="/host" component={Host} />
          <Route path="/player" component={Player} />

        </Switch >

        <footer className="fbc pm0">
          <ul className="footer-list pm0">
              <li><a href="https://github.com/chingu-voyages/v8-chimeras-team-01" target="_blank" rel="noopener noreferrer">Source Code</a></li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default App;
