import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actionsCollection from '../actions'

class ErrorPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { oAuth } = this.props
    const { error, error_details } = oAuth
    return (
      <Card>
        <Card.Body>
          <Card.Title>Error Page</Card.Title>
          <>
            <h5>Description:</h5>
            <pre>
              <code>
                {error_details
                  ? JSON.stringify(error_details, null, 2)
                  : 'Error details are not available!...'}
              </code>
            </pre>
          </>
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
  }
}

const ActionCreators = Object.assign({}, actionsCollection)
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage)
