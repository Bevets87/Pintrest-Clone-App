import { SET_PHOTOS, SET_PHOTO_ERRORS } from '../actions/photoActions'

const DEFAULT_STATE = {
  photos: [],
  photoErrors: null
}

const setPhotos = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      photos: action.photos,
      photoErrors: null
    }
  )
}

const setPhotoErrors = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      photos: [],
      photoErrors: action.photoErrors
    }
  )
}

const photoReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_PHOTOS:
    return setPhotos(state, action)
  case SET_PHOTO_ERRORS:
    return setPhotoErrors(state, action)
  default:
    return state
  }
}

export default photoReducer
