const Question = require('../models/db.js')

const getAllQuestions = (req, res) => {
  Question.find()
    .then(questions => res.status(200).json(questions))
    .catch(err => {
      res.status(500).json(err)
      console.error(err)
    })
}

module.exports = getAllQuestions
