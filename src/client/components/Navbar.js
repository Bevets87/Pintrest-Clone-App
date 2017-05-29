import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Actions from 'grommet/components/icons/base/Actions'
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter'

class Navbar extends Component {
  constructor (props) {
    super (props)
    this.handleNavigationHome = this.handleNavigationHome.bind(this)
  }
  handleNavigationHome (event) {
    event.preventDefault()
    this.props.history.push('/')
  }
  render () {
    return (
    <Header full='horizontal' colorIndex='brand' fixed={true} size='medium' >
      <Anchor onClick={this.handleNavigationHome} className='navbar-title' style={{'marginLeft':'10px'}}>
        Pinteresting
      </Anchor>
      <Box flex={true} justify='end' direction='row' responsive={false}>
        <Menu  icon={<Actions style={{'marginRight': '20px'}} />} dropAlign={{'right': 'right', 'top': 'top'}}>
          <Anchor onClick={this.handleNavigationHome} className='active'>
            Home
          </Anchor>
          <Anchor href='/auth/twitter'>
            <SocialTwitterIcon /> Login
          </Anchor>
        </Menu>
      </Box>
    </Header>
    )
  }
}

Navbar.propTypes = {
  history: PropTypes.object
}

export default Navbar
