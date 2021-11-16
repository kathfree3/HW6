// package imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import s from 'styled-components'

const QuestionSideBar = ({ setSelectedQ }) => {
  const [questions, setQuestions] = useState([])
  const [loggedin, setLoggedin] = useState(false)

  const navigate = useNavigate()

  useEffect(async () => {
    const { data: qs } = await axios.get('/api/questions')
    setQuestions(qs)
    const { data: l } = await axios.get('/account/isloggedin')
    setLoggedin(l.user)
  }, [])

  const addNewQ = async () => {
    console.log('add new qusetion clicked')
  }

  return (
    <SideBar>
      {loggedin
        ? (<PrettyButton type="button" onClick={() => addNewQ()}> Add new Question +</PrettyButton>)
        : (<PrettyButton onClick={() => navigate('/login')}>Log in here!</PrettyButton>)}
      {questions.map(q => (
        <QuestionTitle onClick={() => setSelectedQ(q)} key={q._id}>
          {q.questionText}
        </QuestionTitle>
      ))}
    </SideBar>
  )
}

export default QuestionSideBar

const QuestionTitle = s.button`
  padding: 0.5rem;
  margin: 0.5rem;
  text-align: left;
  background: white;
  border: solid 1px #dbdbdb;
  border-radius: 2px;
  .selected {
    border: solid 1px #9aeaed;
  }
`
const SideBar = s.div`
  display: flex;
  flex-direction: column;
`

const PrettyButton = s.button`
  padding: 0.5rem;
  margin: 0.5rem;
  background: #696eb3;
  color: white;
  border: solid 1px #dbdbdb;
  border-radius: 5px;
`
