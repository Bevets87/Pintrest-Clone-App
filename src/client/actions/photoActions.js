import axios from 'axios'

export const SET_PHOTOS = 'SET_PHOTOS'
export const SET_PHOTO_ERRORS = 'SET_PHOTO_ERRORS'

export const setPhotos = photos => {
  return {type: SET_PHOTOS, photos: photos}
}

export const setPhotoErrors = photoErrors => {
  return {type: SET_PHOTO_ERRORS, photoErrors: photoErrors}
}

export const getPhotos = () => {
  return dispatch => {
    return axios.get('/photos')
    .then(
      response => {
        let photos = response.data.photos
        dispatch(setPhotos(photos))
      })
    .catch(
      error => {
        let photoErrors = error.response.data.errors
        dispatch(setPhotoErrors(photoErrors))
      })
  }
}

export const createPhoto = photoData => {
  return axios.post('/photos/create', photoData)
}

export const updatePhoto = photoData => {
  return axios.post('/photos/update', photoData)
}

export const deletePhoto = photoData => {
  return axios.post('/photos/delete', photoData)
}
