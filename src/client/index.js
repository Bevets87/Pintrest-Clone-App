import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import store from './store/configureStore'
import { getPhotos } from './actions/photoActions'

import App from './components/App'

import 'grommet/scss/vanilla/index.scss'
import './index.scss'

store.dispatch(getPhotos())

render (
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('app')
)
