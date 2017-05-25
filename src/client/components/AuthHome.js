import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { verifyUser, setUser, setUserErrors } from '../actions/userActions'

import App from 'grommet/components/App'
import AuthNavbar from './AuthNavbar'

class AuthHome extends Component {
  constructor (props) {
    super (props)
  }
  componentWillMount () {
    verifyUser()
    .then(
      response => {
        const user = {
          displayName: response.data.user.displayName,
          username: response.data.user.username
        }
        let token = response.data.token
        localStorage.setItem('token', token)
        this.props.dispatch(setUser(user, true))
      })
    .catch(
      error => {
        this.props.dispatch(setUserErrors(error.response.data.errors))
      })
  }
  render () {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <App centered={false}>
          <AuthNavbar />
        </App>
      )
    } else {
      return (
        <h1 style={{'textAlign':'center', 'marginTop':'50px'}}>This is a protected page!</h1>
      )
    }
  }
}

AuthHome.propTypes = {
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.userReducer
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(AuthHome)
