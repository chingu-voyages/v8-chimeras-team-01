const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {Challenges} = require('../models/challengesModel');

router.get('/', (req, res) => {
        Challenges
        .find()
        .then(posts => {
            res.json(posts.map(post => post.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
});

router.get('/:id', (req, res) => {
    Challenges
    .findById(req.params.id)
    .then(post => {
        res.json( post.serialize());
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went terribly wrong' });
    });
});

module.exports = router;