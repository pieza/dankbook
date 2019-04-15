const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', require: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    text: { type: String },
    likes: [{
        user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true }
    }],
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', CommentSchema)