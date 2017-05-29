import jwt from 'jsonwebtoken'
import Photo from '../models/Photo'
import config from '../config'
const { JWT_SECRET } = config

export const handle_get_photos = (req, res) => {
  Photo.find()
  .populate('owner')
  .exec((err, photos) => {
    if (err) return console.error(err)
    res.json({photos: photos})
  })
}

export const handle_create_photo = (req, res) => {
  const { photo_url, photo_text, owner, token } = req.body
  console.log(req.body)
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
      let newPhoto = new Photo({
        url: photo_url,
        text: photo_text,
        likes: [],
        owner: owner._id
      })
      newPhoto.likes.push(owner.username)
      newPhoto.save((err, photo) => {
        if (err) return console.error(err)
        console.log(photo)
        res.json({photo: photo})
      })
    } else {
      res.json({errors: 'Invalid User'})
    }
  })
}

export const handle_update_photo = (req, res) => {
  const { user, photo_id, token } = req.body
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
    Photo.findOne({_id: photo_id}, (err, photo) => {
      if (err) return console.error(err)
      if (photo.likes.indexOf(user.username) >= 0) {
        console.log('user has already liked this photo')
        res.json({photo: photo})
      } else {
        let photoLikes = photo.likes.slice()
        photoLikes.push(user.username)
        photo.likes = photoLikes
        photo.save((err, photo) => {
          if (err) return console.error(err)
          res.json({photo: photo})
        })
      }
    })
  } else {
      res.json({errors: 'Invalid User'})
    }
  })
}

export const handle_delete_photo = (req, res) => {
  const { photo_id, token } = req.body
  console.log(req.body)
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
      Photo.findOneAndRemove({_id: photo_id}, (err, photo) => {
        if (err) return console.error(err)
        console.log(photo)
        res.json({photo: photo})
      })
    } else {
      res.json({errors: 'Invalid User'})
    }
  })
}
