// package imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'

import { PrettyButton } from '../GlobalStyles'

const NewQuestion = () => {
  const [questionText, setQuestionText] = useState('')
  const [show, setShow] = useState(false)

  const submit = async () => {
    const { data } = await axios.post('/api/questions/add', { questionText })
    if (data) {
      setShow(false)
    }
  }

  return (
    <>
      <PrettyButton type="button" onClick={() => setShow(true)}>
        Add new question +
      </PrettyButton>
      <Modal centered show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea style={{ minWidth: '100%' }} value={questionText} onChange={e => setQuestionText(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <PrettyButton type="button" onClick={() => setShow(false)}>
            Close
          </PrettyButton>
          <PrettyButton type="button" onClick={() => submit()}>
            Save Changes
          </PrettyButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewQuestion
