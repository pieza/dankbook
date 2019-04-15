const express = require('express')
const router = express.Router()
const passport = require('passport')
const { uploadImage } = require('../utils/image-uploader')
const Post = require('../models/post')
const User = require('../models/user')

/** GET All */
router.get('/', async (req, res, next) => {
    try {
        // get all posts
        const postList = await Post.find().sort({ date: -1 })
            .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
        
        const results = postList.map(async post => {
            const user = await User.findById(post.user_id)
            if(user){
                post._doc.user = user.getSimpleUser()
            }
            return post
        })

        Promise.all(results).then((completed) => {
            res.json(completed)
        })   
    } catch(err){
        next(err)
    }
})

/** GET One */
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found with that Id' }))
})

/** POST new post */
router.post('/', passport.authenticate('jwt', {session: false}) , async (req, res, next) => {
    try {
        const newPost = new Post({
            user_id: req.body.user_id,
            description: req.body.description
        })
        if(req.file){
            try {
                const url = await uploadImage(req.file)
                newPost.image_url = url
            } catch(err){
                return res.status(500).json({errors: { image: err.message}})
            }
            
        }
        newPost.save().then(post => {
            res.status(200).json(post)
        })    
    } catch(err) {
        next(err)
    }
})

module.exports = router;