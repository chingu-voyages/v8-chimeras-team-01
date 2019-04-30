import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';


export default () => (
    <div id='nav'>
        <header>
          <Link to="/" className="pointy">
            <h1 className="header pm0">Bragging Rights</h1>
          </Link>
          <h4 className="sub-header pm0">Outwit your friends and earn <em>Bragging Rights</em></h4>
        </header>
    </div>
)
