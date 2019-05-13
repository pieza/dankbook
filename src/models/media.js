const mongoose = require('mongoose')
const { Schema } = mongoose

const MediaSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', require: true },
    type: { type: String, require: true },
    url: { type: String }
})

module.exports = mongoose.model('Media', MediaSchema)