import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getPhotos, deletePhoto, setPhotoErrors } from '../actions/photoActions'

import Box from 'grommet/components/Box'
import Columns from 'grommet/components/Columns'
import Image from 'grommet/components/Image'
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
    event.preventDefault()
    if (!event.target.value) {
      event.target = event.target.ownerDocument.activeElement
    }
    const { dispatch } = this.props
    var token = localStorage.getItem('token')
    var photo_id = event.target.value
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
        <Animate enter={{'animation': 'slide-right', 'duration': 300, 'delay': 0}} keep={true}>
          <Box flex={true}>
          {myPhotos.length > 0 &&
              <Columns style={{'width':'95%', 'margin':'25px auto', 'background':'rgba(100,100,100,0.1)','border':'1px solid rgba(0,0,0,0.4)','borderRadius':'10px'}}  justify='center' masonry={true} maxCount={3} size='medium'  >
              {myPhotos.map(photo => {
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
                      <Button fill={true} className='like-photo-button' icon={<FavoriteIcon/>} label={photo.likes.length.toString()} />
                    </Box>
                    <Button primary={true} fill={true} value={photo._id} className='delete-photo-button' icon={<CloseIcon/>} label='delete' onClick={this.handleDeletePhoto}/>
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
