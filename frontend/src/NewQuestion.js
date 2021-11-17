// package imports
import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'

import { PrettyButton } from '../GlobalStyles'

const NewQuestion = () => {
  const [questionText, setQuestionText] = useState('')
  const [show, setShow] = useState(false)

  // reset if you close it
  const close = () => {
    setShow(false)
    setQuestionText('')
  }

  // create new post
  const submit = async () => {
    const { data } = await axios.post('/api/questions/add', { questionText })
    if (data) {
      close()
    }
  }

  return (
    <>
      <PrettyButton type="button" onClick={() => setShow(true)}>
        Add new question +
      </PrettyButton>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea style={{ minWidth: '100%' }} value={questionText} onChange={e => setQuestionText(e.target.value)} />
          <PrettyButton type="button" onClick={() => submit()}>
            Submit Question
          </PrettyButton>
          <PrettyButton type="button" onClick={() => close()}>
            Close
          </PrettyButton>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewQuestion
