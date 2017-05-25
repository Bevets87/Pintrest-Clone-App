import React, { Component } from 'react'

import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Title from 'grommet/components/Title'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Actions from 'grommet/components/icons/base/Actions'
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter'

class Navbar extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    return (
    <Header full='horizontal' colorIndex='neutral-1-a' fixed={true} size='medium' >
      <Title style={{'marginLeft': '20px'}}>
        Pinteresting
      </Title>
      <Box flex={true} justify='end' direction='row' responsive={false}>
        <Menu  icon={<Actions style={{'marginRight': '20px'}} />} dropAlign={{'right': 'right', 'top': 'top'}}>
          <Anchor href='#' className='active'>
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

export default Navbar
