const mongoose = require('mongoose')
const User = require('../models/user')
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

CommentSchema.methods.getComplete = async function () {
    // get user
    const user = await User.findById(this.user_id)

    if(user)
        this._doc.user = user.getSimple()
        
    return this
}

module.exports = mongoose.model('Comment', CommentSchema)