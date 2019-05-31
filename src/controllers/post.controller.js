const express = require('express')
const router = express.Router()
const passport = require('passport')
const validatePostInput = require('../utils/validators/post.validator')
const validateCommentInput = require('../utils/validators/comment.validator')
const postService = require('../services/post.service')
const commentService = require('../services/comment.service')
const Post = require('../models/post')

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    let user_id = null
    
    if(req.user)
        user_id = req.user._id
    
    postService.findHome(user_id).then((posts) => {
        if(posts)
            return res.json(posts)
        else 
            return  res.status(404).json({ nopostsfound: 'No posts found' })
    }).catch(err => next(err))   
})

router.get('/user/:user_id', async (req, res, next) => {
    postService.findAll({user_id: req.params.user_id}).then((posts) => {
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
        res.status(200).json(post.likes)
    }).catch( err => next(err))
})

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const post = await Post.findById(req.params.id)
    req.body.post_id = post._id
    
    const { errors, isValid } = validateCommentInput(req.body)  

    if(!isValid)
        return res.status(400).json({ errors })

    commentService.create(req.body).then(async comment => { 
        res.status(200).json(await post.getComplete())
    }).catch( err => next(err))
})

router.delete('/:id', (req, res, next) => {
    postService.delete(req.params.id)
        .then(async post => res.json(await post.getComplete()))
        .catch( err => next(err))
})

router.delete('/:post_id/comment/:comment_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const post = await Post.findById(req.params.post_id)

    commentService.delete(req.params.comment_id).then(async comment => { 
        res.status(200).json(await post.getComplete())
    }).catch( err => next(err))
})

module.exports = router;