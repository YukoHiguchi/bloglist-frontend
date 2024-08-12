import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NewBlog = ({ doCreate }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    doCreate({ title, url, author })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group as={Row} className="mb-3" controlId="title">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              data-testid="title"
              value={title}
              onChange={handleTitleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="url">
          <Form.Label column sm="2">
            URL
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              data-testid="url"
              value={url}
              onChange={handleUrlChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="author">
          <Form.Label column sm="2">
            Author
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              data-testid="author"
              value={author}
              onChange={handleAuthorChange}
            />
          </Col>
        </Form.Group>

        <Row>
          <Col sm={{ span: 4, offset: 4 }}>
            <Button type="submit" className="my-3">
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default NewBlog
