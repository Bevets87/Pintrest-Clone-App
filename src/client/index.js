import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import store from './store/configureStore'

import App from './components/App'

import 'grommet/scss/hpinc/index.scss'
import './index.scss'

render (
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('app')
)
