import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actionsCollection from '../actions'
import withRouter from './common/withRouter'

class Logout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //  Call Action method on component load
    let { actions, navigate } = this.props
    actions.fn_logOut(navigate)
  }

  render() {
    let { navigate } = this.props
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            You are logged out <br />
          </Card.Title>
          <Card.Text>You are at Logout Page</Card.Text>
          <Button as={Link} variant='primary' to='/home'>
            Back to Home
          </Button>
        </Card.Body>
      </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout))
