const express = require('express')
const router = express.Router()
const controller = require('./controllers/controllers.js')
const { upload, uploadImage } = require('./controllers/imageUpload.js')

//CRUD operations
router.get('/questions', controller.getAllQuestions)
router.get('/question/:id', controller.getQuestion)
router.post('/question', controller.postQuestion)
router.post('/question/:id/upload', upload.single('image'), (req, res) =>
  uploadImage(req, res)
)
router.put('/question/:id', controller.updateQuestion)
router.delete('/question/:id', controller.deleteQuestion)

module.exports = router
