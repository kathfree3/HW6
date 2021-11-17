// package imports
import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from 'styled-components'

// local imports
import { PrettyButton } from '../GlobalStyles'
import NewQuestion from './NewQuestion'

const QuestionSideBar = ({ questions, loggedin, setSelectedQ }) => {
  const navigate = useNavigate()

  return (
    <SideBar>
      {loggedin
        ? (
          <NewQuestion />
        )
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
