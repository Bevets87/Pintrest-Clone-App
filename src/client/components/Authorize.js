import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { verifyUser, setUser, setUserErrors } from '../actions/userActions'

import Box from 'grommet/components/Box'
import Spinning from 'grommet/components/icons/Spinning'

class Authorize extends Component {
  constructor (props) {
    super (props)
  }
  componentWillMount () {
    verifyUser()
    .then(
      response => {
        const user = {
          displayName: response.data.user.displayName,
          username: response.data.user.username,
          displayPhoto: response.data.user.displayPhoto,
          _id: response.data.user._id
        }
        let token = response.data.token
        localStorage.setItem('token', token)
        this.props.dispatch(setUser(user, true))
        this.props.history.push('/home')
      })
    .catch(
      error => {
        this.props.dispatch(setUserErrors(error.response.data.errors))
      })
  }
  render () {
    return (
      <Box full={true} direction='row' justify='center'>
          <Spinning size='xlarge' style={{'marginTop':'200px'}} />
      </Box>
    )
  }
}

Authorize.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object
}

export default connect()(Authorize)
