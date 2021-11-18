// package imports
import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from 'styled-components'

// local imports
import { Button } from '../GlobalStyles'
import NewQuestion from './NewQuestion'

const QuestionSideBar = ({
  loggedin, questions, setSelectedIndex,
}) => {
  const navigate = useNavigate()

  return (
    <SideBar>
      {loggedin ? <NewQuestion />
        : (<Button onClick={() => navigate('/login')}>Log in to submit a question!</Button>)}
      {questions && questions.map((q, ind) => (
        <QuestionTitle onClick={() => setSelectedIndex(ind)} key={q._id}>
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
  width: 40%;
`
