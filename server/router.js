const express = require('express')
const router = express.Router()
const controller = require('./controllers/')

//CRUD operations
router.get('/questions')
router.post('/question')
router.put('/question/:id')
router.delete('/question/:id')

module.exports = router
