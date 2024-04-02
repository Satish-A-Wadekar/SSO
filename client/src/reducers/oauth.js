import * as types from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case types.SUCCESS: {
      return {
        ...state,
        data: action.payload,
        error_details: null,
        error: false,
        loading: false,
      }
    }
    case types.ERROR: {
      return {
        ...state,
        data: null,
        error_details: action.payload,
        error: true,
        loading: false,
      }
    }
    case types.LOADING:
    default: {
      return {
        ...state,
        error: false,
        data: null,
        error_details: null,
        loading: true,
      }
    }
  }
}
