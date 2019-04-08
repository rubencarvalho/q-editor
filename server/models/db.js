const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: { type: String, default: 'New question' },
  rows: { type: Array, default: [] },
  columns: { type: Array, default: [] },
})

module.exports = mongoose.model('Question', questionSchema)
