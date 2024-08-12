import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Row className="justify-content-center m-3">
      <Col style={hideWhenVisible} className="text-center" variant="primary">
        <Button onClick={toggleVisibility} className="text-center">
          {props.buttonLabel}
        </Button>
      </Col>
      <Col style={showWhenVisible} className="text-center">
        {props.children}
        <Button
          variant="secondary"
          className="text-center"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </Col>
    </Row>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Togglable
