/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { Form } from 'react-bootstrap'

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <Form.Group className='mb-3' controlId={label + '_FormField'}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...input} type={type} placeholder={label} />
      <Form.Text className='text-danger'>{touched && error}</Form.Text>
    </Form.Group>
  )
}
