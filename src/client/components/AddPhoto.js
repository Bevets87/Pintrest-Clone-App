import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getPhotos, createPhoto, setPhotoErrors } from '../actions/photoActions'

import App from 'grommet/components/App'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Button from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'
import Animate from 'grommet/components/Animate'

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
    event.preventDefault()
    const { photo_url, photo_text } = this.state
    const { user, dispatch } = this.props
    let token = localStorage.getItem('token')
    createPhoto({photo_url: photo_url, photo_text: photo_text, owner_id: user._id, token: token})
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
        <App centered={false}>
        <Animate enter={{'animation': 'slide-right', 'duration': 300, 'delay': 0}} keep={true}>
          <Box full={true}>
            <Box flex={true}>
              <Box separator='all' size='large' colorIndex='light-2' style={{'margin':'50px auto','paddingBottom': '50px'}}>
                <Title style={{'fontSize': '55px','fontWeight':'bold', 'color':'rgb(134,92,214)','margin':'20px auto'}} >
                  Add Photo
                </Title>
                <FormField style={{'width': '95%', 'margin':'10px auto'}} label='Link to the photo'>
                  <TextInput id='photo-url' onDOMChange={this.handleOnChange}/>
                </FormField>
                <FormField style={{'width': '95%', 'margin':'10px auto'}} label='Text of the photo'>
                  <TextInput id='photo-text' onDOMChange={this.handleOnChange} />
                </FormField>
                <Button className='add-photo-button' icon={<AddIcon/>} label='Add' onClick={this.handleSubmitPhoto} primary={false} secondary={false} accent={false} />
              </Box>
            </Box>
          </Box>
        </Animate>
        </App>
      )
    } else {
      return (
        <h1 style={{'textAlign':'center', 'marginTop':'50px'}}>This is a protected page!</h1>
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
