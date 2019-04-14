const Image = require('../models/image.js')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    // rejects storing a file
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})

const uploadImage = (req, res) => {
  //Ensure there are no spaces in the name and that the '/public' folder is not included
  let imageData = req.file.path
    .split(' ')
    .join('-')
    .slice(req.file.path.indexOf('/images') + 1)

  fs.rename(req.file.path, req.file.path.split(' ').join('-'), err => {
    if (err) console.log('ERROR: ' + err)
  })
  const newImage = new Image({
    rowOrColumnID: req.params.id,
    imageData: imageData,
  })

  if (req.body.questionID !== 'null') {
    newImage.questionID = req.body.questionID
  }

  newImage
    .save()
    .then(result => {
      res.status(200).json({ result })
    })
    .catch(err => next(err))
}

module.exports = { upload, uploadImage }
