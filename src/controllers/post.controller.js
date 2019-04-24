const express = require('express')
const router = express.Router()
const passport = require('passport')
const postService = require('../services/post.service')
const Post = require('../models/post')

router.get('/', async (req, res, next) => {
    postService.findAll().then((posts) => {
        console.log('resasdasd', posts)
        if(posts)
            return res.json(posts)
        else 
            return  res.status(404).json({ nopostsfound: 'No posts found' })
    }).catch(err => next(err))   
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(async post => res.json(await post.getComplete()))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found with that Id' }))
})

router.post('/', passport.authenticate('jwt', {session: false}) , async (req, res, next) => {
    postService.create(req.body, req.file).then(post => {
        res.status(200).json(post)
    }).catch(err => next(err))  
})

module.exports = router;