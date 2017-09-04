import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Masonry from 'react-masonry-component'

import { connect } from 'react-redux'
import { updatePhoto, getPhotos, setPhotoErrors } from '../actions/photoActions'

import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Button from 'grommet/components/Button'
import FavoriteIcon from 'grommet/components/icons/base/Favorite'
import Animate from 'grommet/components/Animate'
import Notification from 'grommet/components/Notification'

class AuthHome extends Component {
  constructor (props) {
    super(props)
    this.handleLikePhoto = this.handleLikePhoto.bind(this)
  }
  handleLikePhoto (event) {
    const { user, dispatch } = this.props
    event.preventDefault()
    if (!event.target.value) {
      event.target = event.target.ownerDocument.activeElement
    }
    let photo_id = event.target.value
    let token = localStorage.getItem('token')
    updatePhoto({user: user, photo_id: photo_id, token: token})
    .then(() => {
      dispatch(getPhotos())
    })
    .catch(error => {
      let photoErrors = error.response.data.errors
      dispatch(setPhotoErrors(photoErrors))
    })
  }
  render () {
    const { isAuthenticated, photos } = this.props
    if (isAuthenticated) {
      return (
        <Animate enter={{
          'animation': 'fade',
          'duration': 1000,
          'delay': 0}} keep={true}>
          {photos.length > 0 &&
            <Masonry>
              {photos.map(photo => {
                return (
                  <div className='grid-item'>
                    <Box justify='start' direction='row' responsive={false}>
                      <img src={photo.owner.displayPhoto} />
                      <Paragraph style={{
                        'width':'100%',
                        'fontWeight':'bold',
                        'margin':'10px auto',
                        'padding':'0'}}
                        align='center' size='large'>{photo.owner.username}</Paragraph>
                    </Box>
                    <Box>
                      <img src={photo.url} />
                    </Box>
                    <Box>
                      <Paragraph style={{
                        'width':'100%',
                        'padding': '0',
                        'margin':'0 auto',
                        'overflowX':'scroll'
                      }}
                      align='center' size='large'>{photo.text}</Paragraph>
                      <Button fill={true} value={photo._id} className='like-photo-button' icon={<FavoriteIcon/>} label={photo.likes.length.toString()} onClick={this.handleLikePhoto} />
                    </Box>
                  </div>
                )
              })}
            </Masonry>
            }
        </Animate>
      )
    } else {
      return (
        <Notification state='Unauthorized' message='Login to access this page' size='large' status='warning' />
      )
    }
  }
}

AuthHome.propTypes = {
  isAuthenticated: PropTypes.bool,
  photos: PropTypes.array,
  user: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.userReducer
  const { photos } = state.photoReducer
  return {
    isAuthenticated,
    photos,
    user
  }
}

export default connect(mapStateToProps)(AuthHome)
