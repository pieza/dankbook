const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    description: { type: String },
    image_url: { type: String },
    likes: [{
        user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true }
    }],
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostSchema)