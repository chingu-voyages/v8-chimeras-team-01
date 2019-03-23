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
import Games from './components/Games';
import Nav from './components/Nav';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      gameList: [
        {
          id: "0001",
          name: "Waffles",
          image: <i class="fas fa-stroopwafel fa-6x"></i>,
          desc: "What you know 'bout Waffles??"
        },
        {
          id: "0002",
          name: "Cookies",
          image: <i class="fas fa-cookie fa-6x"></i>,
          desc: "You knwo you can eat them, but what else??"
        }
      ]
    }
  }

  render() {
    return (
      <div id="top-level-container">
        <Nav />

        <Switch>

          <Route exact path="/" component={Landing} />
          <Route path="/results" component={Results} />
          <Route path="/games"
                 render={(props) =>
                  <Games {...props}
                    gameList={this.state.gameList} />}
          />
          <Route path="/instructions" component={Instructions} />
          <Route path="/questions" component={Questions} />
          <Route path="/leaderBoard" component={LeaderBoard} />

        </Switch >

        <footer>
          <ul>
              <li><Link to="/">Landing Component</Link></li>
              <li><Link to="/results">Results Component</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/questions">Questions Component</Link></li>
              <li><Link to="/leaderBoard">LeaderBoard Component</Link></li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default App;
