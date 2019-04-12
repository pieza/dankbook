const express = require('express')
const router = express.Router()

const passport = require('passport')
const PATH = process.env.API_PATH

/* GET user by id */
router.get('/:id', (req, res) => {

})

router.post(`${PATH}/login`, (req, res) => {

})

router.post(`${PATH}/signup`, passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

module.exports = router;