const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/:username', async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username })

    if(!user)
        return res.status(404).json({errors:{ username: "User doesn't exist" }})

    delete user.password
    return res.status(200).json(user)
})

module.exports = router;
