import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import ReduxThunk from 'redux-thunk'

// Import all sub components
import oauth from './oauth'

//combine all Reducers at one place
const rootReducer = combineReducers({
  form: reduxForm,
  oauth,
})

const middleware = [ReduxThunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//create configureStore
const configureStore = () => {
  //return createStore(rootReducer, {}, applyMiddleware([ReduxThunk]));
  return createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)))
}

export default configureStore
