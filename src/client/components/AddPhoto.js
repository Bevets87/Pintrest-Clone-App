import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getPhotos, createPhoto, setPhotoErrors } from '../actions/photoActions'

import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Button from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'
import Animate from 'grommet/components/Animate'
import Notification from 'grommet/components/Notification'

class AddPhoto extends Component {
  constructor (props) {
    super (props)
    this.state = {
      photo_url: '',
      photo_text: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmitPhoto = this.handleSubmitPhoto.bind(this)
  }
  handleOnChange (event) {
    event.preventDefault()
    switch (event.target.id) {
    case 'photo-url':
      this.setState({
        photo_url: event.target.value
      })
      break
    case 'photo-text':
      this.setState({
        photo_text: event.target.value
      })
      break
    }
  }
  handleSubmitPhoto (event) {
    const { photo_url, photo_text } = this.state
    const { user, dispatch } = this.props
    event.preventDefault()
    let token = localStorage.getItem('token')
    createPhoto({photo_url: photo_url, photo_text: photo_text, owner: user, token: token})
    .then(() => {
      dispatch(getPhotos())
      this.props.history.push('/my-photos')
    })
    .catch(error => {
      let photoErrors = error.response.data.errors
      dispatch(setPhotoErrors(photoErrors))
    })
  }
  render () {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <Animate enter={{
          'animation': 'slide-up',
          'duration': 300,
          'delay': 0}} keep={true}>
          <Box flex={true}>
            <Box separator='all' size='large' colorIndex='light-2' style={{'margin':'10vh auto','paddingBottom': '50px'}}>
                <Heading style={{'color':'rgb(134,92,214)'}} strong={true} truncate={true} align='center' margin='medium'>ADD PHOTO</Heading>
                <FormField style={{'width': '95%', 'margin':'10px auto'}} label='Link to the photo'>
                  <TextInput id='photo-url' onDOMChange={this.handleOnChange}/>
                </FormField>
                <FormField style={{'width': '95%', 'margin':'10px auto'}} label='Text of the photo'>
                  <TextInput id='photo-text' onDOMChange={this.handleOnChange} />
                </FormField>
                <Button className='add-photo-button' icon={<AddIcon/>} label='Add' onClick={this.handleSubmitPhoto} />
            </Box>
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

AddPhoto.propTypes = {
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object
}

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.userReducer
  return {
    isAuthenticated,
    user
  }
}

export default connect(mapStateToProps)(AddPhoto)
