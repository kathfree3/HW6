// package imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import s from 'styled-components'

// local imports
import QuestionSideBar from './QuestionSideBar'
import ViewQuestion from './ViewQuestion'

const Home = () => {
  const [questions, setQuestions] = useState([])
  const [loggedin, setLoggedin] = useState(false)
  const [selectedQ, setSelectedQ] = useState({})

  const navigate = useNavigate()

  useEffect(async () => {
    const { data: qs } = await axios.get('/api/questions')
    setQuestions(qs)
    setSelectedQ(qs[0])
    const { data: l } = await axios.get('/account/isloggedin')
    setLoggedin(l.user)
  }, [])

  const logout = async () => {
    await axios.post('/account/logout')
    navigate('/login')
  }

  return (
    <FullPage>
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
        <QuestionSideBar questions={questions} loggedin={loggedin} setSelectedQ={setSelectedQ} />
        <ViewQuestion loggedin={loggedin} selectedQ={selectedQ} />
      </Page>
    </FullPage>
  )
}

export default Home

const Page = s.div`
  display: flex;
`
const FullPage = s.div`
  padding: 1rem;
  background: #e9eff0;
`
const Title = s.div`
  display: flex;
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
