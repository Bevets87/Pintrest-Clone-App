import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'

import App from 'grommet/components/App'

import Navbar from './Navbar'
import Home from './Home'

import Authorize from './Authorize'

import AuthNavbar from './AuthNavbar'
import AuthHome from './AuthHome'
import MyPhotos from './MyPhotos'
import AddPhoto from './AddPhoto'

class PinterestCloneApp extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    const { isAuthenticated } = this.props
    var Header
    if (isAuthenticated) {
      Header = AuthNavbar
    } else {
      Header = Navbar
    }
    return (
      <BrowserRouter>
        <App centered={false}>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/authorize' component={Authorize} />
          <Route path='/home' component={AuthHome} />
          <Route path='/my-photos' component={MyPhotos} />
          <Route path='/add-photo' component={AddPhoto} />
        </App>
      </BrowserRouter>
    )
  }
}

PinterestCloneApp.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.userReducer
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(PinterestCloneApp)
