import React, { useState } from 'react'

export default function Join() {

    const [userName, setUserName] = useState('');
    const [connectionID, setConnectionID] = useState('');

    /* Form inputs are pushed up into this.state.entry so that React has total control of the data */

    const handleConnectionInput = ({ target }) => setConnectionID(target.value)
    const handleUserName = ({ target }) => setUserName(target.value)

    return (
        <div id='join'>

            <input type="text"
                name="username"
                value={userName}
                onChange={handleUserName}
                placeholder="Skinnyboy Thompson" required />

            <input type="text"
                name="connectionID"
                value={connectionID}
                onChange={handleConnectionInput}
                placeholder="Skinnyboy Thompson" required />


        </div >
    )
}




