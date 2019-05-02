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
            id: '',
            users: {},
            playersUpdated: false
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
                this.handleReceivedData(data);
                console.log("Data received: ", data);
            })

            this.state.conn.on('close', () => {
                console.log("connection reset, awaiting connection...");
                this.setState({ conn: null });
            })
        }

        handleReceivedData = (data) => {
          switch (data) {

            default:
              this.catchOthers(data);
              break;
          };
        }

        catchOthers = (data) => {
          if (data.individualResults) {
            this.updateResults(data);
          }
        }

        updateResults = (data) => {

          this.updatePlayersScores(data.individualResults.userName, data.individualResults.myScore);
          //check if all results are received
            if (Object.keys(this.state.users).length === this.state.players.length) {
              //trigger host update users with own score
              //by setting playersUpdated to true
              this.setState({ playersUpdated : true });
              console.log("players updated");
            }

        }

        updatePlayersScores = (user, score) => {
          let scoreUpdate = {[user]: score};
          this.setState({
            users: {
              ...this.state.users,
              [user]: score,
            },
          });
          this.setState({
            users: Object.assign({}, this.state.users, {
              [user]: score,
            }),
          });
          console.log(this.state.users);
        }

        resetPlayersUpdated = () => {
          this.setState({ playersUpdated : false });
        }

        componentDidMount() {

            this.initialize();
        }

        render() {
            return (
                <WrappedComponent {...this.props} data={this.state} resetPlayersUpdated={this.resetPlayersUpdated}/>
            )
        }
    }
}

export default withPeerJs;
