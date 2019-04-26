const Post = require('../models/post')
const { IMAGE, VIDEO } = require('../utils/enums/media-types')
const mediaService = require('./media.service')

const service = {}

service.findAll = async () => {
    const postList = await Post.find().sort({ date: -1 })

    const results = postList.map(async post => {
        return await post.getComplete()
    })

    return await Promise.all(results)
}

service.create = async (postToCreate, file) => {
    const newPost = new Post({
        user_id: postToCreate.user_id,
        description: postToCreate.description
    })

    const postCreated = await newPost.save()

    console.log(postToCreate.media)
    if(postToCreate.media){
        if(postToCreate.media.type === IMAGE && file)
            await mediaService.attachImageFile(postCreated.id, file)
    }

    return postCreated.getComplete()  
}

module.exports = service