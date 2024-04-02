import _ from 'lodash'
import popupTools from 'popup-tools'
import React, { Component } from 'react'
import { Container, DropdownItem, Image, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import ID from 'shortid'
import * as actionsCollection from '../actions'
import images from '../assets/Images'
import withRouter from './common/withRouter'

class PageLayout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //  Call Action method on component load
    let { actions, navigate } = this.props
    actions.fn_getLoggedInUserDetails(navigate)
  }

  renderLoginOptions = () => {
    return (
      <>
        <NavDropdown.Item key={ID.generate()} href='/oauth/google'>
          Google
        </NavDropdown.Item>
        <NavDropdown.Item key={ID.generate()} href='/oauth/facebook'>
          Facebook
        </NavDropdown.Item>
        <NavDropdown.Item key={ID.generate()} href='/oauth/linkedin'>
          LinkedIn
        </NavDropdown.Item>
        <NavDropdown.Item key={ID.generate()} href='/oauth/instagram'>
          Instagram
        </NavDropdown.Item>
        <NavDropdown.Item key={ID.generate()} href='/oauth/spotify'>
          Spotify
        </NavDropdown.Item>
        <NavDropdown.Item key={ID.generate()} href='/oauth/github'>
          GitHub
        </NavDropdown.Item>
        <NavDropdown.Item key={ID.generate()} href='/login'>
          login
        </NavDropdown.Item>
      </>
    )
  }

  renderLoginOptions_ = () => {
    return (
      <>
        <DropdownItem eventKey='/oauth/google'>Google</DropdownItem>
        <DropdownItem eventKey='/oauth/facebook'>Facebook</DropdownItem>
        <DropdownItem eventKey='/oauth/linkedin'>Linked In</DropdownItem>
        <DropdownItem eventKey='/oauth/instagram'>Instagram</DropdownItem>
        <DropdownItem eventKey='/oauth/spotify'>Spotify</DropdownItem>
        <DropdownItem eventKey='/oauth/github'>Github</DropdownItem>
        <DropdownItem eventKey='/oauth/login'>Login</DropdownItem>
      </>
    )
  }

  handleSelect = (eventKey, event) => {
    if (eventKey.indexOf('oauth') !== -1) {
      event.preventDefault()
      popupTools.popup(eventKey.toLowerCase(), `SSO Login`, {}, (err, user) => {
        if (err) {
          console.log(err.message)
        } else {
          let { actions, navigate } = this.props
          actions.fn_getLoggedInUserDetails()
          //  navigate('/home')
        }
      })
    }
  }

  render() {
    const { oAuth } = this.props
    const { data } = oAuth
    const isAuth = _.has(data, '_id')
    return (
      <>
        <Navbar className='bg-body-tertiary mb-3' expand='lg' bg='dark' data-bs-theme='dark'>
          <Container fluid>
            <Navbar.Brand href='/home'>
              <img
                alt=''
                src={images.Logo}
                width='30'
                height='30'
                className='d-inline-block align-top'
              />
              SSO App
            </Navbar.Brand>
            <Navbar.Collapse className='justify-content-end'>
              <Nav>
                &nbsp;&nbsp;
                <span className='text-white'>
                  Welcome &nbsp;&nbsp;
                  {data ? (
                    <>
                      {data?.first_name || data?.username}&nbsp;{data?.last_name ?? ''}&nbsp;&nbsp;
                      <Image
                        src={data?.picture ?? images.userImageNotFound}
                        roundedCircle
                        width={30}
                        height={30}
                      />
                    </>
                  ) : (
                    <>
                      {'Guest'}&nbsp;&nbsp;
                      <Image src={images.defaultUser} roundedCircle width={30} height={30} />
                    </>
                  )}
                </span>
              </Nav>
              <Nav>
                {isAuth ? (
                  <NavDropdown
                    className='text-white'
                    align='end'
                    title='Profile'
                    id='basic-nav-dropdown'
                    onSelect={(eventKey, event) => this.handleSelect(eventKey, event)}
                  >
                    <NavDropdown.Item key={ID.generate()} href='/logout'>
                      logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <NavDropdown
                      className='text-white'
                      align='end'
                      title='Sign In'
                      id='basic-nav-dropdown'
                      onSelect={(eventKey, event) => this.handleSelect(eventKey, event)}
                    >
                      {this.renderLoginOptions(isAuth)}
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Outlet />
        </Container>
      </>
    )
  }
}

// Mapping Global State object with current Component props
const mapStateToProps = (globalState) => {
  return {
    oAuth: globalState.oauth,
  }
}

const ActionCreators = Object.assign({}, actionsCollection)
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageLayout))
