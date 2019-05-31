const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const { uploadImage, deleteImage } = require('../utils/image-uploader')

router.get('/', async (req, res, next) => {
    try{
        let filters = {}

        if(req.query)
            filters = { username: { $regex: new RegExp(req.query.username), $options: 'i' } }

        const users = await User.find(filters)
    
        const results = users.map(async user => {
            return await user.getComplete()
        })
    
        return res.status(200).json(await Promise.all(results))

    } catch(err) {
        next(err)
    }
})

router.get('/popular', async (req, res, next) => {
    try{
        const users = await User.find()
    
        const results = users.map(async user => {
            return await user.getComplete()
        })

        const completeUsers = await Promise.all(results)

        let sortedUsers = completeUsers.sort((a, b) => {
            return a.followers.length < b.followers.length 
        }) 

        if(req.query.top)
            sortedUsers = sortedUsers.splice(0, req.query.top)
            
        return res.status(200).json(sortedUsers)

    } catch(err) {
        next(err)
    }
})

router.get('/:username', async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username })

    if(!user)
        return res.status(404).json({errors:{ username: "User doesn't exist" }})

    return res.status(200).json(await user.getComplete())
})

router.post('/follow/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const userToFollow = await User.findById(req.params.id)

        if(!user)
            return res.status(401).json({errors:{ user: "Authentication error" }})

        if(!userToFollow)
            return res.status(404).json({errors:{ user: "User doesn't exist" }})

        // check if user already follow the user
        const followIndex = user.following.findIndex(f => { return f._id +''  === userToFollow._id + ''})

        if(followIndex >= 0)
            user.following.splice(followIndex, 1)
        
        else
            user.following.push(userToFollow._id)

        await user.save()

        return res.status(200).json(await userToFollow.getComplete())
    } catch(err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user)
            return res.status(404).json({errors:{ username: "User doesn't exist" }})
        
        if(req.body){
            if(req.body.description)
                user.description = req.body.description
        }

        if(req.file) {
            deleteImage(user.avatar).catch(err => { console.log(err)})

            const url = await uploadImage(req.file)
            user.avatar = url
        }
        
        const userUpdated = await user.save()

        return res.status(200).json(await userUpdated.getComplete())

    } catch(err){
        next(err)
    }
})

module.exports = router;
