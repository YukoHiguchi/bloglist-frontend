import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import Notification from './Notification'

const Navigation = () => {
  const { handleLogout } = useAuth()
  const user = useSelector((state) => state.user.user)
  console.log('Navigation user', user)

  return (
    <div>
      {/* Navigation menu */}
      <ul>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? { color: 'blue' } : undefined)}
            to="/"
          >
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="/users"
          >
            Users
          </NavLink>
        </li>
        <li>
          {user ? (
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
          ) : (
            <div>not logged in</div>
          )}
        </li>
      </ul>

      <h1>blog app</h1>
      <Notification />
      <Outlet />
    </div>
  )
}

export default Navigation
