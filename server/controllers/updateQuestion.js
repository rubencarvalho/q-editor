const Question = require('../models/db.js')
const updateQuestion = (req, res) => {
  console.log(req.params.id)
  Question.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then(question => {
      console.log('found it')
      res.status(200).json(question)
    })
    .catch(err => res.status(500).json(err))
}
module.exports = updateQuestion
