const Question = require('../models/db.js')
const getQuestion = (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      res.status(200).json(question)
    })
    .catch(err => res.status(500).json(err))
}
module.exports = getQuestion
