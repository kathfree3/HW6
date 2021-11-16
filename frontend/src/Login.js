// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submit = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    // eslint-disable-next-line no-alert
    return data.success ? navigate('/') : alert(data.msg)
  }
  return (
    <div>
      <h2>Log in</h2>
      <form>
        <input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
      </form>
      <button type="button" onClick={() => submit()}> Login </button>
      Dont have an account?
      <Link to="/signup">Sign up!</Link>
    </div>
  )
}

export default Login
