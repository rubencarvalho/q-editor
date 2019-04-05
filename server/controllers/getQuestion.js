const Question = require('../models/db.js')
const getQuestion = (req, res) => {
  res.status(200).send('getQuestion')
}
module.exports = getQuestion
