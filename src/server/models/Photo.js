import mongoose from 'mongoose'
const Schema = mongoose.Schema

const photoSchema = new Schema({
  url: String,
  text: String,
  likes: Array,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Photo = mongoose.model('photo', photoSchema)

export default Photo
