import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.config.dev'

import session from 'express-session'

import passport from 'passport'

import passportRoutes from './routes/passport'
import photoRoutes from './routes/photo'

import config from 'config'
const { SESSION_SECRET } = config

let app = express()

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, '../client' )))
app.use(bodyParser.json())

app.use(session({
  secret: process.env.SESSION_SECRET || SESSION_SECRET,
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
  res.sendFile(path.join(__dirname, '../client/index.html'))
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
