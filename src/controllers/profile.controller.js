const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/:username', async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username })

    if(!user)
        return res.status(404).json({errors:{ username: "User doesn't exist" }})

    delete user.password
    return res.status(200).json(user)
})

router.post('/follow/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = await User.findById(req.user.id)
    const userToFollow = await User.findById(req.params.id)

    if(!user)
        return res.status(404).json({errors:{ user: "Authentication error" }})

    if(!userToFollow)
        return res.status(404).json({errors:{ user: "User doesn't exist" }})

    const followIndex = user.following.findIndex(f => { return f._id == userToFollow.id })

    // check if user already liked the post
    if(followIndex >= 0)
        user.following.splice(followIndex, 1)
    else
        user.following.push(user.id)

    const userUpdated = await User.update(user);

    return res.status(200).json(userUpdated)
})

module.exports = router;
