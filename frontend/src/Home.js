// package imports
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [questions, setQuestions] = useState([])
  const [loggedin, setLoggedin] = useState(false)

  const navigate = useNavigate()

  useEffect(async () => {
    const { data: qs } = await axios.get('/api/questions')
    setQuestions(qs)
    const { data: l } = await axios.get('/account/isloggedin')
    setLoggedin(l.user)
  }, [])

  const logout = async () => {
    await axios.post('/account/logout')
    navigate('/login')
  }

  return (
    <div>
      <h2>Home  page</h2>
      {questions.map(q => (
        <p>
          {' '}
          {q.questionText}
          {' '}
        </p>
      ))}
      {loggedin
        ? (<button type="button" onClick={() => logout()}> Log out</button>)
        : (<Link to="/login">Log in here!</Link>)}
    </div>
  )
}

export default Home
