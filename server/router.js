const express = require('express')
const router = express.Router()
const controller = require('./controllers/controllers.js')
const Question = require('./models/db.js')

//CRUD operations
router.get('/questions', controller.getAllQuestions)
router.get('/question/:id', controller.getQuestion)
router.post('/question', controller.postQuestion)
router.put('/question/:id', controller.updateQuestion)
router.delete('/question/:id', controller.deleteQuestion)

module.exports = router
