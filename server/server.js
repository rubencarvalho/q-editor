const PORT = 4000
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  res.send('May Node be with you')
})

app.listen(4000, () => console.log('Listening on port 4000.'))
