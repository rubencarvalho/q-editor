const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: { type: String, default: 'New question' },
})

module.exports = mongoose.model('Question', questionSchema)
