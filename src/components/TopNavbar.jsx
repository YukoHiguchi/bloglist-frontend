import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Notification from './Notification'
import Button from 'react-bootstrap/Button'

const TopNavbar = () => {
  const { handleLogout } = useAuth()
  const user = useSelector((state) => state.user.user)

  return (
    <div>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Blog App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-start">
            <Nav>
              <Nav.Link
                as={NavLink}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                to={'/'}
              >
                Blogs
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                to="/users"
              >
                Users
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {user ? (
                <Navbar.Text className="ms-4">
                  {user.name} logged in
                  <Button className="ms-2 btn-sm" onClick={handleLogout}>
                    logout
                  </Button>
                </Navbar.Text>
              ) : (
                <div className="align-center">not logged in</div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-2">
        <Notification />
        <Outlet />
      </Container>
    </div>
  )
}

export default TopNavbar
