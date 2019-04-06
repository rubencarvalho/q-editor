const Question = require('../models/db.js')
const deleteQuestion = (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(question => {
      res.status(204).json(question)
    })
    .catch(err => res.status(500).json(err))
}
module.exports = deleteQuestion
