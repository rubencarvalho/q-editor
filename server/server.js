const PORT = process.env.PORT || 4000
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const mongoose = require('mongoose')

//Avoid deprecation warnings
mongoose.set('useFindAndModify', false)

// Allow CORS
app.use(cors())

// Middleware
app.use(express.json())
app.use(router)

// DB & Server connection
mongoose.connect('mongodb://localhost:27017/q-editor', {
  useNewUrlParser: true,
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
