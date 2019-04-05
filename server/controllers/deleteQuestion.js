const Question = require('../models/db.js')
const deleteQuestion = (req, res) => {
  res.status(200).send('DeleteRequest')
}
module.exports = deleteQuestion
