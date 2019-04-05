const Question = require('../models/db.js')
const postQuestion = (req, res) => {
  res.status(200).send('PostQuestion')
}
module.exports = postQuestion
