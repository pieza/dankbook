const express = require('express')
const router = express.Router()
const passport = require('passport')
const validatePostInput = require('../utils/validators/post.validator')
const postService = require('../services/post.service')
const Post = require('../models/post')

router.get('/', async (req, res, next) => {
    postService.findAll().then((posts) => {
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

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.body.media_string)
        req.body.media = JSON.parse(req.body.media_string)

    const { errors, isValid } = validatePostInput({...req.body, file: req.file})  
    
    if(!isValid)
        return res.status(400).json({ errors })

    postService.create(req.body, req.file).then(post => { 
        res.status(200).json(post)
    }).catch( err => next(err))
})

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    postService.toggleLike(req.params.id, req.user.id).then(post => { 
        res.status(200).json(post)
    }).catch( err => next(err))
})

router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(async post => res.json(await post.getComplete()))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found with that Id' }))
})

module.exports = router;