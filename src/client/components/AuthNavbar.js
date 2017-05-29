import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'

import { withRouter } from 'react-router-dom'

import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'

class AuthNavbar extends Component {
  constructor (props) {
    super (props)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleNavigation = this.handleNavigation.bind(this)
  }
  handleNavigation (event) {
    event.preventDefault()
    switch (event.target.id) {
    case 'home':
      this.props.history.push('/' + event.target.id)
      break
    case 'my-photos':
      this.props.history.push('/' + event.target.id)
      break
    case 'add-photo':
      this.props.history.push('/' + event.target.id)
      break
    }
  }
  handleLogout (event) {
    event.preventDefault()
    localStorage.removeItem('token')
    this.props.dispatch(setUser(null,false))
    this.props.history.push('/')
  }
  render () {
    return (
    <Header full='horizontal' colorIndex='brand' fixed={true} size='medium' >
      <Anchor id='home' onClick={this.handleNavigation} className='navbar-title' style={{'marginLeft':'10px'}}>
        Pinteresting
      </Anchor>
      <Box flex={true} justify='end' direction='row' responsive={false}>
        <Menu  icon={<Title className='navbar-display-name'>{this.props.user.displayName}</Title>} dropAlign={{'right': 'right', 'top': 'top'}}>
          <Anchor id='home' onClick={this.handleNavigation}>Home</Anchor>
          <Anchor id='my-photos' onClick={this.handleNavigation}>My Photos</Anchor>
          <Anchor id='add-photo' onClick={this.handleNavigation}>Add Photo</Anchor>
          <Anchor onClick={this.handleLogout}>Logout</Anchor>
        </Menu>
      </Box>
    </Header>
    )
  }
}

AuthNavbar.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { user } = state.userReducer
  return {
    user
  }
}

export default connect(mapStateToProps)(withRouter(AuthNavbar))
