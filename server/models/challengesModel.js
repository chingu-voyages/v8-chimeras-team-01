const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
 
const questionsSchema = mongoose.Schema({ 
    q: String,
    a: [String],
    c: String,
});

const challengeSchema = mongoose.Schema ({
    category: String,
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