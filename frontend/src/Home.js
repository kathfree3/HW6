// package imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import s from 'styled-components'

// local imports
import QuestionSideBar from './QuestionSideBar'
import ViewQuestion from './ViewQuestion'
import {
  FullPage,
} from '../GlobalStyles'

const Home = () => {
  const [questions, setQuestions] = useState([])
  const [loggedin, setLoggedin] = useState(false)
  const [selectedQ, setSelectedQ] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const navigate = useNavigate()

  // async func to call to get questions
  const getQuestions = async () => {
    const { data } = await axios.get('/api/questions')
    setQuestions(data)
    setSelectedQ(data[selectedIndex])
  }

  useEffect(() => {
    // get questions every 2 seconds
    getQuestions()
    const intervalID = setInterval(() => {
      getQuestions()
    }, 2000)
    // fetch user logged in
    const fetchUser = async () => {
      const { data: l } = await axios.get('/account/isloggedin')
      setLoggedin(l.user)
    }
    fetchUser()
    return () => clearInterval(intervalID)
  }, [])

  const logout = async () => {
    await axios.post('/account/logout')
    navigate('/login')
  }

  return (
    <Wrapper>
      {selectedIndex}
      <Title>
        <h1>Campuswire Lite</h1>
        {loggedin
            && (
            <LogOut>
              Hi
              {' '}
              {loggedin}
              <button type="button" onClick={() => logout()}> Log out </button>
            </LogOut>
            )}
      </Title>
      <Page>
        <QuestionSideBar
          loggedin={loggedin}
          questions={questions}
          setSelectedQ={setSelectedQ}
          setSelectedIndex={setSelectedIndex}
        />
        {selectedQ && <ViewQuestion loggedin={loggedin} selectedQ={questions[selectedIndex]} />}
      </Page>
    </Wrapper>
  )
}

export default Home

const Page = s.div`
  display: flex;
  column-gap: 30px;
`
const Wrapper = s(FullPage)`
  padding: 1rem;
  background: #e9eff0;
`
const Title = s.div`
  display: flex;
  background: white;
  h1 {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
  }
`

const LogOut = s.p`
  margin-left: auto;
`
