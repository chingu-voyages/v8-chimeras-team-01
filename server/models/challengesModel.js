const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const questionsSchema = mongoose.Schema({ 
    Q1: 'string',
    correct: 'string',
    anwserOne: 'string',
    anwsertwo: 'string',
    answerThree: 'string',
    answerFour: 'string'
});

const challengeSchema = mongoose.Schema ({
    category: 'string',
    questions: [questionsSchema],
})

challengeSchema.methods.serialize = function () {
    return {
        id: this._id,
        category: this.category,
        questions: this.questions,
    };

};

const Challenges = mongoose.model('Challenges', challengeSchema);
module.exports = {Challenges};