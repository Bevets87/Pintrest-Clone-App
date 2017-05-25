import React, { Component } from 'react'

import App from 'grommet/components/App'
import Navbar from './Navbar'

class Home extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    return (
      <App centered={false}>
        <Navbar />
      </App>
    )
  }
}

export default Home
