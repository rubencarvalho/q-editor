const Question = require('../models/db.js')
const updateQuestion = (req, res) => {
  Question.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then(question => {
      res.status(200).json(question)
    })
    .catch(err => res.status(500).json(err))
}
module.exports = updateQuestion
