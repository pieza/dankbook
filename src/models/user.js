const mongoose = require('mongoose')
const { Shecma } = mongoose
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    username: {type: String, require: true },
    password: {type: String, require: true }
})

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)