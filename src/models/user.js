const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
})

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.getSimple = function () {
    return { 
        id: this.id,
        username: this.username, 
        email: this.email, 
        avatar: this.avatar 
    }
}

module.exports = mongoose.model('User', UserSchema)