import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Login from './components/LoginForm'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import UserIndex from './components/userIndex'
import PrivateRoute from './components/PrivateRoute'
import NoMatch from './components/NoMatch'

const App = () => {
  return (
    <div>
      <Navigation />
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
    </div>
  )
}

export default App
