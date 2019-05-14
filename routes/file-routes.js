const express = require('express')
const router = express.Router()
const uploader = require('../configs/cloudinary')

router.post('/upload', uploader.array('imageUrl', 12), (req, res, next) => {
        let urls = []
        for(let i = 0; i<req.files.length; i++){
            urls.push(req.files[i].secure_url)
        }
    
        res.json({ secure_urls: urls })
    })

module.exports = router