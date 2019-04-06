const Question = require('../models/db.js')
const postQuestion = (req, res) => {
  Question.create(req.body)
    .then(question => {
      res.status(201).json(question)
    })
    .catch(err => res.status(500).json(err))
}
module.exports = postQuestion
