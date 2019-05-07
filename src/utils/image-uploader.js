const fs = require('fs-extra')
const path = require('path')
const { randomNumber } = require('../utils/helpers')
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const imageUploader = {}

imageUploader.uploadImage = async (image) => {
    const imgUrl = randomNumber()

    const imageTempPath = image.path;
    const ext = path.extname(image.originalname).toLowerCase()
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)

    // Validate Extension
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // you wil need the public/temp path or this will throw an error
        await fs.rename(imageTempPath, targetPath)

        // upload to cludinary
        const result = await cloudinary.v2.uploader.upload(targetPath)
        // remove image
        await fs.unlink(targetPath)
        
        return result.secure_url
    } else {
        await fs.unlink(imageTempPath)
        throw new Error('Only Images are allowed')
    }
}

imageUploader.deleteImage = async (path) => {
    const name = path.split('/').pop().split('.')[0]
    return await cloudinary.v2.uploader.destroy(name)
}

module.exports = imageUploader