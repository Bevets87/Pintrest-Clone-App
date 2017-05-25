import axios from 'axios'

export const SET_USER = 'SET_USER'
export const SET_USER_ERRORS = 'SET_USER_ERRORS'

export const setUser = (user, isAuthenticated ) => {
  return {type: SET_USER, user: user, isAuthenticated: isAuthenticated}
}

export const setUserErrors = (serverErrors) => {
  return {type: SET_USER_ERRORS, serverErrors: serverErrors}
}

export const verifyUser = () => {
  return axios.post('/auth/verify')
}
