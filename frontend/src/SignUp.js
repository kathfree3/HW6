// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../GlobalStyles'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submit = async () => {
    await axios.post('/account/signup', { username, password })
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        if (err.response.data === 11000) {
          // eslint-disable-next-line no-alert
          alert('This username already exists')
        }
      })
  }

  return (
    <FullPage>
      <Form>
        <h2>Sign up</h2>
        <Label> Username: </Label>
        <Input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <Label> Password: </Label>
        <Input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <Button type="button" onClick={() => submit()}> Sign up! </Button>
        <p>
          Already have an account?
          {' '}
          <Link to="/login">Log in here!</Link>
        </p>
      </Form>
    </FullPage>
  )
}

export default SignUp
