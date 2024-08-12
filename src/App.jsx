import { Routes, Route } from 'react-router-dom'
import TopNavbar from './components/TopNavbar'
import Login from './components/LoginForm'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import UserIndex from './components/userIndex'
import PrivateRoute from './components/PrivateRoute'
import NoMatch from './components/NoMatch'
import Container from 'react-bootstrap/Container'
import './App.css'

const App = () => {
  return (
    <div>
      <TopNavbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<Blog />} />
            <Route path="/users" element={<Users />}>
              <Route index element={<UserIndex />} />
              <Route path=":userId" element={<User />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Container>
    </div>
  )
}

export default App
