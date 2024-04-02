import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actionsCollection from './actions'

import { ErrorPage, Home, Login, Logout, PageLayout } from './components'

class App extends Component {
  constructor(props) {
    super(props)
  }

  router = createBrowserRouter([
    {
      path: '/',
      element: <PageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'logout',
          element: <Logout />,
        },
        {
          path: 'error',
          element: <ErrorPage />,
        },
      ],
    },
  ])

  render() {
    return (
      <React.StrictMode>
        <RouterProvider router={this.router} />
      </React.StrictMode>
    )
  }
}

// Mapping Global State object with current Component props
const mapStateToProps = (globalState, ownProps) => {
  return { globalState, ownProps }
}

const ActionCreators = Object.assign({}, actionsCollection)
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
