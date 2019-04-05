import React, { Component } from 'react';
import Peer from 'peerjs';

const withPeerJs = (WrappedComponent) => {
    return class withPeer extends Component {

        state = {
            peer: new Peer(null, {
                debug: 2
            }),
            conn: null,
            players: [],
            message: '',
            id: ''
        }

        initialize = () => {

            this.state.peer.on('open', (id) => {
                console.log("ID: " + this.state.peer.id);
                this.setState({ id })

            });

            this.state.peer.on('connection', (c) => {
                console.log(c)
                this.setState({ conn: c });
                let players = [...this.state.players];
                players.push(this.state.conn);
                this.setState({ players });
                console.log("Connected to: " + this.state.conn.peer);
                this.ready()
                console.log(this.state.players);
            });

            this.state.peer.on('disconnected', () => {
                //handle connection message
                console.log("Connection lost. Please reconnect");
                this.state.peer.reconnect();
            });

            this.state.peer.on('close', () => {
                this.setState({ conn: null });
                console.log('Connection destroyed');
            });

            this.state.peer.on('error', (err) => {
                console.log(err);
            })
        }

        ready = () => {
            this.state.conn.on('data', (data) => {
                console.log("Data received: ", data);
            })

            this.state.conn.on('close', () => {
                console.log("connection reset, awaiting connection...");
                this.setState({ conn: null });
            })
        }

        componentDidMount() {

            this.initialize();
        }

        render() {
            return (
                <WrappedComponent {...this.props} data={this.state} />
            )
        }
    }
}

export default withPeerJs;
