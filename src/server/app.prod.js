import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import compression from 'compression'

import session from 'express-session'

import passport from 'passport'

import passportRoutes from './routes/passport'
import photoRoutes from './routes/photo'

import config from './config'
const { SESSION_SECRET } = config

let app = express()

app.use(compression())

app.use(express.static(path.join(__dirname, '../../dist' )))
app.use(bodyParser.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  secure: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) { done(null, user) })
passport.deserializeUser(function(user, done) { done(null, user) })

app.use('/', passportRoutes)
app.use('/photos', photoRoutes)

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/PinterestCloneApp');

mongoose.connection.once('open',function(){
  console.log('Connection has been made!')
}).on('error',function(error){
  console.log('Connection error:', error);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on localhost ${process.env.PORT || 3000}` )
})
