const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_JWT_KEY

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	User.findById(jwt_payload._id)
		.then(user => {
			if (user) 
				return done(null, user)
				
			return done(null, false)
		})
		.catch(err => console.log(err))
	})
)