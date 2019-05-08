const Comment = require('../models/comment')

const service = {}

service.create = async (commentToCreate) => {
    const newComment = new Comment({
        post_id: commentToCreate.post_id,
        user_id: commentToCreate.user_id,
        text: commentToCreate.text
    })

    const commentCreated = await newComment.save()

    return commentCreated
}

service.delete = async (id) => {
    const comment = await Comment.findByIdAndDelete(id)
    return comment
}

module.exports = service