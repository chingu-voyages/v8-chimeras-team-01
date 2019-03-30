import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';


export default () => (
    <div id='nav'>
      <Link to="/" className="pointy">
        <header>
          <h1 className="header pm0">Bragging Rights</h1>
          <h4 className="sub-header pm0">Outwit your friends and earn <em>Bragging Rights</em></h4>
        </header>
      </Link>
    </div>
)
