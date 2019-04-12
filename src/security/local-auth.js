const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)

})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = User.findOne({email})
    // user already exist
    if(user)
        return done(null, false, AAAA)

    // create new user
    const newUser = new User()
    newUser.email = email
    newUser.password = newUser.encryptPassword(password)
    await newUser.save()
    done(null, newUser)
}))

