import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

//Stylesheets
import './App.css';

//Components
import Results from './components/Results';
import Questions from './components/Questions';
import LeaderBoard from './components/LeaderBoard';
import Landing from './components/Landing';
import Instructions from './components/Instructions';
import Gaming from './components/Gaming';
import Nav from './components/Nav';

class App extends Component {

  render() {
    return (
      <div id="top-level-container">
        <Nav />

        <Switch>

          <Route exact path="/" component={Landing} />
          <Route path="/results" component={Results} />
          <Route path="/gaming" component={Gaming} />
          <Route path="/instructions" component={Instructions} />
          <Route path="/questions" component={Questions} />
          <Route path="/leaderBoard" component={LeaderBoard} />

        </Switch >

        <footer>
          <ul>
              <li><Link to="/">Landing Component</Link></li>
              <li><Link to="/results">Results Component</Link></li>
              <li><Link to="/gaming">Gaming Component</Link></li>
              <li><Link to="/questions">Questions Component</Link></li>
              <li><Link to="/leaderBoard">LeaderBoard Component</Link></li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default App;
