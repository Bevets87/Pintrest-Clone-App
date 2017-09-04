import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Masonry from 'react-masonry-component'

import { connect } from 'react-redux'
import { getPhotos, deletePhoto, setPhotoErrors } from '../actions/photoActions'

import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Button from 'grommet/components/Button'
import CloseIcon from 'grommet/components/icons/base/Close'
import FavoriteIcon from 'grommet/components/icons/base/Favorite'
import Animate from 'grommet/components/Animate'
import Notification from 'grommet/components/Notification'

class MyPhotos extends Component {
  constructor (props) {
    super (props)
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this)
  }
  handleDeletePhoto (event) {
    const { dispatch } = this.props
    event.preventDefault()
    if (!event.target.value) {
      event.target = event.target.ownerDocument.activeElement
    }
    let token = localStorage.getItem('token')
    let photo_id = event.target.value
    deletePhoto({photo_id: photo_id , token: token})
    .then(() => {
      dispatch(getPhotos())
    })
    .catch(error => {
      let photoErrors = error.response.data.errors
      dispatch(setPhotoErrors(photoErrors))
    })
  }
  render () {
    const { isAuthenticated, myPhotos } = this.props
    if (isAuthenticated) {
      return (
        <Animate enter={{
          'animation': 'fade',
          'duration': 1000,
          'delay': 0}} keep={true}>
          {myPhotos.length > 0 &&
            <Masonry>
              {myPhotos.map(photo => {
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
                      <Button fill={true} className='like-photo-button' icon={<FavoriteIcon/>} label={photo.likes.length.toString()} />
                      <Button primary={true} fill={true} value={photo._id} className='delete-photo-button' icon={<CloseIcon/>} label='delete' onClick={this.handleDeletePhoto}/>
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

MyPhotos.propTypes = {
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
  myPhotos: PropTypes.array
}

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.userReducer
  const { photos } = state.photoReducer
  const myPhotos = photos.filter(photo => photo.owner._id == user._id)
  return {
    isAuthenticated,
    myPhotos,
    user
  }
}

export default connect(mapStateToProps)(MyPhotos)
