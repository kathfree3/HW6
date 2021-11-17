// package imports
import React, { useState } from 'react'
import axios from 'axios'
import s from 'styled-components'

const ViewQuestion = ({ loggedin, selectedQ }) => {
  const [newAnswer, setAnswer] = useState('')

  const {
    questionText, answer, author, _id,
  } = selectedQ || ''

  const submitAnswer = async () => {
    const { data } = await axios.post('/api/questions/answer', { _id, answer: newAnswer })
    setAnswer('')
    if (data.errmsg) {
      // eslint-disable-next-line no-alert
      alert(data.errmsg)
    }
  }

  return (
    <Wrapper>
      <QInfo>
        <h3>
          {questionText}
        </h3>
        <p><b> Author: </b></p>
        <p>
          {author}
        </p>
        <p><b> Answer: </b></p>
        <p>
          {answer}
        </p>
      </QInfo>
      {loggedin && (
        <AnswerPlace>
          <p> Answer this question</p>
          <textarea rows="4" value={newAnswer} onChange={e => setAnswer(e.target.value)} />
          <PrettyButton onClick={() => submitAnswer()}> Submit Answer </PrettyButton>
        </AnswerPlace>
      )}
    </Wrapper>
  )
}

export default ViewQuestion

const QInfo = s.div`
  background: white;
  padding: 1rem;
  margin-bottom: 2rem;
`
const Wrapper = s.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 80%;
`

const AnswerPlace = s.div`
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
