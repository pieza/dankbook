const { uploadImage } = require('../utils/image-uploader')
const { IMAGE, VIDEO } = require('../utils/enums/media-types')
const Post = require('../models/post')
const Media = require('../models/media')

const service = {}

service.attachImageFile = async (post_id, file) => {
    const post = await Post.findById(post_id)

    if(!post)
        throw new Error('Post does not exist')

    if(!file)
        throw new Error('Image not attached')

    try {
        const url = await uploadImage(file)

        const newMedia = new Media({
            post_id,
            type: IMAGE,
            url
        })
    
        return await newMedia.save() 
    } catch(err){
        throw new Error({errors: { media: err.message}})
    }
}

service.attachImageUri = async (post_id, url) => {
    const post = await Post.findById(post_id)

    if(!post)
        throw new Error('Post does not exist')

    const newMedia = new Media({
        post_id: post.post_id,
        type: IMAGE,
        url
    })

    return await newMedia.save() 
}
service.attachVideo = () => {

}

module.exports = service