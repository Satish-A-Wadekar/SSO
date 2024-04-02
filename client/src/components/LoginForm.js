import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

import formFields from '../data/loginFormFields'
import validateEmails from '../utils/validateEmails'
import fieldsComponent from './common/Fields'

class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type }) => {
      return <Field key={name} component={fieldsComponent} label={label} name={name} type={type} />
    })
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.props.onLoginSubmit)}>
        {this.renderFields()}
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    )
  }
}

function validate(values) {
  const errors = {}

  //check if email id is valid
  errors.username = validateEmails(values.username || '')

  //check rest of the fields
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  })

  //if error object has any property, then redux form will show errors
  return errors
}

export default reduxForm({
  validate,
  form: 'loginForm',
  destroyOnUnmount: false,
})(LoginForm)
