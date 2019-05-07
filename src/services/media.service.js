const { uploadImage, deleteImage } = require('../utils/image-uploader')
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
        throw new Error(err.message)
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

service.deleteByPostId = async (id) => {
    const media = await Media.find({ post_id: id })
    media.map(md => {
        switch(md.type){
            case IMAGE:
                deleteImage(md.url)
                break
        }
        Media.findByIdAndDelete(md._id)
    })
}

module.exports = service