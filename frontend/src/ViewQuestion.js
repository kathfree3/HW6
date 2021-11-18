// package imports
import React, { useState } from 'react'
import axios from 'axios'
import s from 'styled-components'

// local imports
import { Button } from '../GlobalStyles'

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
        {author}
        <p><b> Answer: </b></p>
        {answer}
      </QInfo>
      {loggedin && (
        <AnswerPlace>
          <p> Answer this question</p>
          <textarea rows="4" value={newAnswer} onChange={e => setAnswer(e.target.value)} />
          <Button onClick={() => submitAnswer()}> Submit Answer </Button>
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
