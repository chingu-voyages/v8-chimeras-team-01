const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');

require('dotenv').config();
const { DATABASE_URL, PORT } = require('./config');
const challengesRouter = require('./routers/challengesRouter');

mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use('/api/questions', challengesRouter);

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
          console.log('Closing server');
          server.close(err => {
              if (err) {
                  return reject(err);
              }
              resolve();
          });
      });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer};