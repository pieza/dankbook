const mongoose = require('mongoose')
const { Schema } = mongoose

const BadgeSchema = new Schema({
    description: { type: String },
    color: { type: String }
})

module.exports = mongoose.model('Badge', BadgeSchema)