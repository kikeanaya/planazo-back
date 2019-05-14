const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecret
})

var storage = cloudinaryStorage({
    cloudinary,
    folder: 'planazo',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, res, cb) {
        cb(null, res.originalname)
    }
})

const uploader = multer({ storage })
module.exports = uploader