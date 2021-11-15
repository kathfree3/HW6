// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submit = async () => {
    const { data } = await axios.post('/account/signup', { username, password })
    if (data.success) {
      navigate('/')
    } else {
      // eslint-disable-next-line no-alert
      alert(data.msg)
    }
  }

  return (
    <div>
      <h2>Sign up</h2>
      <form>
        <input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
      </form>
      <button type="button" onClick={() => submit()}> Sign up! </button>
      Already have an account?
      <Link to="/login">Log in here!</Link>
    </div>
  )
}

export default SignUp