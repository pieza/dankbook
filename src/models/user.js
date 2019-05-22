const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    description: { type: String, default: 'Generic description.' },
    password: { type: String, require: true },
    avatar: { type: String },
    badges: [{
        description: { type: String },
        color: { type: String }
    }],
    following: [{
        user_id: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
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
        _id: this._id,
        username: this.username, 
        avatar: this.avatar
    }
}

UserSchema.methods.getComplete = async function () {
    const userFollowers = await mongoose.model('User', UserSchema).find({ following: [{_id: this._id}] })

    const followers = []

    userFollowers.forEach(u => {
        followers.push({_id: u._id})
    })

    return { 
        _id: this._id,
        username: this.username,
        description: this.description, 
        following: this.following,
        followers: followers,
        badges: this.badges,
        avatar: this.avatar,
        date: this.date
    }
}

module.exports = mongoose.model('User', UserSchema)