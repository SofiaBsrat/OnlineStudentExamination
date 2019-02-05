const {from} = require('rxjs');
let Question = require('../models/question');

class QuestionService {
    constructor() {

    }

    add(questionObj) {
        let newQuestion = new Question(questionObj);
        return newQuestion.save();

    }

    get(queryObj) {
        return from(Question.find(queryObj));
    }

    update(queryObj, questionObj) {

    }

    delete(queryObj) {}
}

module.exports = QuestionService;