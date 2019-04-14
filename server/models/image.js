const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* 
    Image Schema for storing images in the 
    mongodb database
*/
const imageSchema = new Schema({
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: false,
  },
  rowOrColumnID: {
    type: String,
    default: 'none',
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Image', imageSchema)
