const express = require('express')
const router = express.Router()
const User = require('../models/user')
const gravatar = require('gravatar')
const jtw = require('jsonwebtoken')
const passport = require('passport')
const validateSignupInput = require('../utils/validators/signup.validator')
const validateLoginInput = require('../utils/validators/login.validator')

/** GET logout */
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

/** GET login */
router.post('/login', async (req, res, next) => {
    try {
        const { errors, isValid } = validateLoginInput(req.body)
        
        // input data is incomplete
        if(!isValid)
            return res.status(400).json({ errors })

        const user = await User.findOne({ username: req.body.username })
        
        // user not exist
        if(!user)
            return res.status(404).json({errors:{ username: "User doesn't exist" }})
        
        // incorrect password
        if(!user.comparePassword(req.body.password))
            return res.status(400).json({errors: { password: 'Incorrect password' }})
        
        // user match
        const payload = user.getSimple()
        
        jtw.sign(payload,
            process.env.SECRET_JWT_KEY, 
            { expiresIn: 3600 }, 
            (err, token) => {
                if(err)
                    next(err)
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                })
            }
        )
    } catch(err) {
        next({errors: { image: err }})
    }
})

/** POST signup */
router.post('/signup', async (req, res, next) => {
    try {
        const { errors, isValid } = validateSignupInput(req.body)
        
        // input data is incomplete
        if(!isValid)
            return res.status(400).json({ errors })

        const userByEmail = await User.findOne({ email: req.body.email })
        const userByUsername = await User.findOne({ username: req.body.username })
    
        // email already exist
        if(userByEmail)
            return res.status(400).json({errors: { email: 'Email already taken' }})
    
        if(userByUsername)
            return res.status(400).json({errors: { username: 'Username already taken' }})
    
        // get avatar
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'robohash',
        })
    
        // create user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            avatar
        })
        newUser.password = newUser.encryptPassword(req.body.password)
    
        // save user
        newUser.save().then(async user => res.json(await user.getSimple()))

    } catch(err) {
        next(err)
    }
})

router.get('/current', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const user = await User.findById(req.user._id)
    const payload = user.getSimple()
    console.log(user)    
    jtw.sign(payload,
        process.env.SECRET_JWT_KEY, 
        { expiresIn: 3600 }, 
        (err, token) => {
            if(err)
                next(err)
            res.json({
                success: true,
                token: 'Bearer ' + token
            })
        }
    )
})

module.exports = router;