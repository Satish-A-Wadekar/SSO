import React, { Component } from 'react'
import { Card, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionsCollection from '../actions'
import images from '../assets/Images'
import withRouter from './common/withRouter'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //  Call Action method on component load
    let { actions } = this.props
    actions.fn_getLoggedInUserDetails()
  }

  render() {
    const { data } = this.props.oAuth
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Welcome&nbsp;
            {data ? (
              <>
                {data?.first_name || data?.username}&nbsp;{data?.last_name ?? ''}&nbsp;&nbsp;
                <Image
                  src={data?.picture ?? images.userImageNotFound}
                  roundedCircle
                  width={70}
                  height={70}
                />
              </>
            ) : (
              <>
                {'Guest'}&nbsp;&nbsp;
                <Image src={images.defaultUser} roundedCircle width={40} height={40} />
              </>
            )}
          </Card.Title>
          <Card.Text>you are on Home Page</Card.Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
