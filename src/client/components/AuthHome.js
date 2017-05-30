import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { updatePhoto, getPhotos, setPhotoErrors } from '../actions/photoActions'

import Box from 'grommet/components/Box'
import Columns from 'grommet/components/Columns'
import Image from 'grommet/components/Image'
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
    event.preventDefault()
    if (!event.target.value) {
      event.target = event.target.ownerDocument.activeElement
    }
    const { user, dispatch } = this.props
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
        <Animate enter={{'animation': 'slide-right', 'duration': 300, 'delay': 0}} keep={true}>
          <Box flex={true}>
          {photos.length > 0 &&
              <Columns style={{'width':'95%', 'margin':'25px auto', 'background':'rgba(100,100,100,0.1)','border':'1px solid rgba(0,0,0,0.4)','borderRadius':'10px'}}  justify='center' masonry={true} maxCount={3} size='medium'  >
              {photos.map(photo => {
                return (
                  <Box style={{'border':'2px solid rgb(134,92,214)','borderRadius':'10px'}} margin='medium' wrap={true} key={photo._id} colorIndex='light-2' >
                    <Box justify='start' direction='row'>
                      <Image size='thumb' src={photo.owner.displayPhoto} />
                      <Paragraph style={{'fontWeight':'bold','margin':'10px auto', 'padding':'0'}} size='large'>{photo.owner.username}</Paragraph>
                    </Box>
                    <Box>
                      <Image src={photo.url} full={true} fit='contain' />
                    </Box>
                    <Box>
                      <Paragraph style={{'padding': '0', 'margin':'0 auto'}}size='large'>{photo.text}</Paragraph>
                      <Button value={photo._id} className='like-photo-button' icon={<FavoriteIcon/>} label={photo.likes.length.toString()} onClick={this.handleLikePhoto} />
                    </Box>
                  </Box>
                )
              })}
            </Columns>
            }
          </Box>
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
