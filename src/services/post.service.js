const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const Media = require('../models/media')
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

service.findAll = async (filters) => {
    const postList = await Post.find(filters).sort({ date: -1 })

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
        if(postToCreate.media.type === IMAGE && file)
            await mediaService.attachImageFile(postCreated.id, file)
    }

    return await postCreated.getComplete()
}

service.delete = async (id) => {
    // delete comments
    const comments = await Comment.find({ post_id: id })
    comments.map(comment => {
        Comment.findByIdAndDelete(comment._id)
    })

    // delete media
    mediaService.deleteByPostId(id)

    return await Post.findByIdAndDelete(id)
}

service.toggleLike = async (post_id, user_id) => {
    const user = await User.findById(user_id)
    const post = await Post.findById(post_id) 

    if(!user)
        throw new Error('User not found')
    
    if(!post)
        throw new Error('Post not found')

    const likeIndex = post.likes.findIndex(l => { return l._id == user.id })

    // check if user already liked the post
    if(likeIndex >= 0)
        post.likes.splice(likeIndex, 1)
    else
        post.likes.push(user.id)
    
    const postUpdated = await post.save()
    return postUpdated
    
}

module.exports = service