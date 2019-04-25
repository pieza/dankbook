const mongoose = require('mongoose')
const { Schema } = mongoose
const User = require('../models/user')
const Media = require('../models/media')

const PostSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    description: { type: String },
    likes: [{
        user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true }
    }],
    date: { type: Date, default: Date.now }
})

PostSchema.methods.getComplete = async function () {
    // get user
    const user = await User.findById(this.user_id)

    if(user)
        this._doc.user = user.getSimple()

    // get media
    const media = await Media.find({ post_id: this.post_id })

    if(media)
        this._doc.media = media
        
    return this
}

module.exports = mongoose.model('Post', PostSchema)