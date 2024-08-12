import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = useAuth()

  const login = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={login}>
        <Form.Group as={Row} className="mb-3" controlId="loginFormUsername">
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Username"
              data-testid="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="loginFormPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              data-testid="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" className="mb-2">
          Login{' '}
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
