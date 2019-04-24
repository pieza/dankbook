const mongoose = require('mongoose')
const { Schema } = mongoose
const User = require('../models/user')

const PostSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    description: { type: String },
    image_url: { type: String },
    likes: [{
        user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true }
    }],
    date: { type: Date, default: Date.now }
})

PostSchema.methods.getComplete = async function () {

    const user = await User.findById(this.user_id)
    if(user)
        this._doc.user = user.getSimpleUser()

    return this
}
module.exports = mongoose.model('Post', PostSchema)