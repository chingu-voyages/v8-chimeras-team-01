import React, { useState } from 'react';

export default function Join(props) {

    const [userName, setUserName] = useState('');
    const [connectionID, setConnectionID] = useState('');

    /* Form inputs are pushed up into this.state.entry so that React has total control of the data */

    const handleConnectionInput = ({ target }) => setConnectionID(target.value);
    const handleUserName = ({ target }) => setUserName(target.value);



    return (
        <div id='join'>
            <div className="join__container">
                <h1 className="join__title">Join A Game</h1>
                <div className="join__wrapper">

                    <h3>What shall we call you?</h3>
                    <input type="text"
                        className="join__input"
                        name="username"
                        value={userName}
                        onChange={handleUserName}
                        placeholder="Coolio_49" required />

                    <h3>Enter the game ID you want to join</h3>
                    <input type="text"
                        className="join__input"
                        name="connectionID"
                        value={connectionID}
                        onChange={handleConnectionInput}
                        placeholder="y17kjteeff000000" required />

                </div>
            </div>
            <button className="join__btn" onClick={() => {
                props.handleConnection(connectionID);
                props.updateUsername(userName);
                props.pushLocation('/player/instructions');
            }}>
                <p className="join__anchor_txt">Game Time!</p>
            </button>
        </div >
    )
}
