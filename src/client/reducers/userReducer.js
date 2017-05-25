import { SET_USER, SET_USER_ERRORS } from '../actions/userActions'

const DEFAULT_STATE = {
  user: null,
  isAuthenticated: false,
  serverErrors: null
}

const setUser = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      user: action.user,
      isAuthenticated: action.isAuthenticated,
      serverErrors: null
    }
  )
}

const setUserErrors = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      user: null,
      isAuthenticated: false,
      serverErrors: action.serverErrors
    }
  )
}

const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return setUser(state, action)
  case SET_USER_ERRORS:
    return setUserErrors(state, action)
  default:
    return state
  }
}

export default userReducer
