import express from 'express'

import jwt from 'jsonwebtoken'

import passport from 'passport'
import TwitterStrategy from 'passport-twitter'

import User from '../models/User'

import config from '../config'
const { TWITTER_CONSUMER_SECRET, TWITTER_CONSUMER_KEY, JWT_SECRET } = config

const createToken = function(username) {
  return jwt.sign({user: username}, JWT_SECRET , {expiresIn: 60 * 60})
}

let router = express.Router()

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({twitterId: profile.id }, function (err, user) {
      if (!user) {
        user = new User({
          displayName: profile.displayName,
          username: profile.username
        })
        user.save((err, user) => {
          if (err) return console.error(err)
          return done(err, user)
        })
      } else {
        return done(err, user)
      }
    })
  }
))

router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/home')
})
router.post('/auth/verify', (req, res) => {
  if (req.isAuthenticated) {
    res.status(200).json({
      user: req.user,
      token: createToken(req.user.username)
    })
  } else {
    res.json({
      errors: 'Invalid User'
    })
  }
})




export default router
