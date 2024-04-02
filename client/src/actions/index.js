import axios from 'axios'
import * as types from './types'

export const fn_logInWithCredentials = (loginFormValues, navigate) => {
  return async (dispatch) => {
    try {
      //  before data fetch, send back loading/processing
      dispatch({ type: types.LOADING })
      // destructure form
      const { username, password } = loginFormValues.values
      //  convert data
      let data = JSON.stringify({ username, password })

      await axios('/oauth/local', {
        method: 'post',
        headers: {
          'Content-type': 'Application/json',
        },
        data: data,
      })
        .then(function (response) {
          navigate('/home')
          dispatch({
            type: types.SUCCESS,
            payload: response.data,
          })
        })
        .catch(function (error) {
          navigate('/error')
          dispatch({
            type: types.ERROR,
            payload: error.response.data,
          })
        })
    } catch (e) {
      navigate('/error')
      dispatch({
        type: types.ERROR,
        payload: 'Something went wrong, try again later!',
      })
    }
  }
}

export const fn_logOut = (navigate) => {
  return async (dispatch) => {
    try {
      // before data fetch, send back loading/processing
      dispatch({ type: types.LOADING })

      // process data fetch
      await axios('/api/logout', {
        method: 'get',
        headers: {
          'Content-type': 'Application/json',
        },
      })
        .then(function (response) {
          dispatch({
            type: types.SUCCESS,
            payload: response.data,
          })
          navigate('/logout')
        })
        .catch(function (error) {
          navigate('/error')
          dispatch({
            type: types.ERROR,
            payload: error.response.data,
          })
        })
    } catch (e) {
      navigate('/error')
      dispatch({
        type: types.ERROR,
        payload: 'Something went wrong, try again later!',
      })
    }
  }
}

export const fn_getLoggedInUserDetails = () => {
  return async (dispatch) => {
    try {
      // before data fetch, send back loading/processing
      dispatch({ type: types.LOADING })

      // process data fetch
      await axios('/api/current_user', {
        method: 'get',
        headers: {
          'Content-type': 'Application/json',
        },
      })
        .then(function (response) {
          dispatch({
            type: types.SUCCESS,
            payload: response.data,
          })
        })
        .catch(function (error) {
          dispatch({
            type: types.ERROR,
            payload: error.response.data,
          })
        })
    } catch (e) {
      dispatch({
        type: types.ERROR,
        payload: 'Something went wrong, try again later!',
      })
    }
  }
}
