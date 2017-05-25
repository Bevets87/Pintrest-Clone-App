import React, { Component } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Home from './Home'
import AuthHome from './AuthHome'

class App extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    return (
      <BrowserRouter>
        <div className='app-container'>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={AuthHome} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
