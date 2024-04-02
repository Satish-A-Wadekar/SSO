import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionsCollection from '../actions'
import LoginForm from './LoginForm'
import withRouter from './common/withRouter'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { actions, navigate, loginFormValues, oAuth } = this.props
    const { error, error_details } = oAuth

    if (error) {
      return (
        <Alert key='danger' variant='danger'>
          {error_details.message}
        </Alert>
      )
    }
    return (
      <div className='container'>
        <LoginForm
          onLoginSubmit={() => {
            actions.fn_logInWithCredentials(loginFormValues, navigate)
          }}
        ></LoginForm>
      </div>
    )
  }
}

// Mapping Global State object with current Component props
const mapStateToProps = (globalState, ownProps) => {
  return {
    oAuth: globalState.oauth,
    loginFormValues: globalState.form.loginForm,
  }
}

const ActionCreators = Object.assign({}, actionsCollection)
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

/*
You can get access to the history object’s properties and the closest <Route>'s match via the "withRouter" in "this.props"
*/
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
