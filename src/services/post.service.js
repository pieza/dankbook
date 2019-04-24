const { uploadImage } = require('../utils/image-uploader')
const Post = require('../models/post')

const service = {}

service.findAll = async () => {
    const postList = await Post.find().sort({ date: -1 })

    const results = postList.map(async post => {
        return await post.getComplete()
    })

    return await Promise.all(results)
}

service.create = async (postToCreate, image) => {
    const newPost = new Post({
        user_id: postToCreate.user_id,
        description: postToCreate.description
    })
    if(image){
        try {
            const url = await uploadImage(image)
            newPost.image_url = url
        } catch(err){
            throw new Error({errors: { image: err.message}})
        }
    }

    const postCreated = await newPost.save()
    return postCreated.getComplete()  
}

module.exports = service