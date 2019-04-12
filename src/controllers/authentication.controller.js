const express = require('express')
const router = express.Router()

const passport = require('passport')

/* GET user by id */
router.get('/:id', (req, res) => {

})

router.post('/login', (req, res) => {
    res.json(req.body)
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

module.exports = router;