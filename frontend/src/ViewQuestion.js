// package imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import s from 'styled-components'

const ViewQuestion = ({
  selectedQ,
}) => {
  const [newAnswer, setAnswer] = useState('')
  const [loggedin, setLoggedin] = useState(false)
  const {
    questionText, answer, author, _id,
  } = selectedQ

  useEffect(async () => {
    const { data: l } = await axios.get('/account/isloggedin')
    setLoggedin(l.user)
  }, [])

  const submitAnswer = async () => {
    const { data } = await axios.post('/api/questions/answer', { _id, answer: newAnswer })
    // eslint-disable-next-line no-alert
    if (data.errmsg) {
      alert(data.errmsg)
    }
  }

  return (
    <Wrapper>
      <QInfo>
        <h1>
          {questionText}
        </h1>
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
          <textarea rows="10" cols="30" value={newAnswer} onChange={e => setAnswer(e.target.value)} />
          <PrettyButton onClick={() => submitAnswer()}> Submit Answer </PrettyButton>
        </AnswerPlace>
      )}
    </Wrapper>
  )
}

export default ViewQuestion

const QInfo = s.div`
background: white;
`
const Wrapper = s.div`
display: flex;
flex-direction: column;
width: 80%;
`

const AnswerPlace = s.div`
display: flex;
`
const PrettyButton = s.button`
  padding: 0.5rem;
  margin: 0.5rem;
  background: #696eb3;
  color: white;
  border: solid 1px #dbdbdb;
  border-radius: 5px;
`
