// package imports
import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'

import { Button } from '../GlobalStyles'

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
      <Button type="button" onClick={() => setShow(true)}> Add new question + </Button>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea style={{ minWidth: '100%' }} value={questionText} onChange={e => setQuestionText(e.target.value)} />
          <Button type="button" onClick={() => submit()}> Submit Question </Button>
          <Button type="button" onClick={() => close()}> Close </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewQuestion
