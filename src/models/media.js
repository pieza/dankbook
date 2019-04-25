const mongoose = require('mongoose')
const { Schema } = mongoose

const MediaSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', require: true },
    type: { type: Schema.Types.String, require: true },
    url: { type: Schema.Types.String }
})

module.exports = mongoose.model('Media', MediaSchema)