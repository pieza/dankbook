const Post = require('../models/post')
const { IMAGE, VIDEO } = require('../utils/enums/media-types')

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

    if(postToCreate.media){
        switch(postToCreate.media){
            case IMAGE:
                break
        }
    }

    return postCreated.getComplete()  
}

module.exports = service