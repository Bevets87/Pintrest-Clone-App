import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  displayName: String,
  username: String,
  displayPhoto: String,
})

const User = mongoose.model('user', userSchema)

export default User
