import React, { useState } from 'react';

export default function Join(props) {

    const [userName, setUserName] = useState('');
    const [connectionID, setConnectionID] = useState('');

    /* Form inputs are pushed up into this.state.entry so that React has total control of the data */

    const handleConnectionInput = ({ target }) => setConnectionID(target.value);
    const handleUserName = ({ target }) => setUserName(target.value);



    return (
        <div id='join'>

            <input type="text"
                name="username"
                value={userName}
                onChange={handleUserName}
                placeholder="Add User Name Here" required />

            <input type="text"
                name="connectionID"
                value={connectionID}
                onChange={handleConnectionInput}
                placeholder="Input your Game ID fromthe host" required />

            <button onClick={() => {
                props.handleConnection(connectionID);
                props.updateUsername(userName);
                props.pushLocation('/player/instructions');
            }}>Submit</button>


        </div >
    )
}
