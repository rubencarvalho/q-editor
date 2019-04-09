const Image = require('../models/image.js')
const multer = require('multer')

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
  const imageData = req.file.path.split(' ').join('-')
  const newImage = new Image({
    questionID: req.params.id,
    imageName: req.body.imageName,
    imageData: imageData,
  })

  newImage
    .save()
    .then(result => {
      console.log(result)
      res.status(200).json({
        success: true,
        document: result,
      })
    })
    .catch(err => next(err))
}

module.exports = { upload, uploadImage }
