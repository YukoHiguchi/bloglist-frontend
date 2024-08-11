import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
  const { userId } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId),
  })

  if (isLoading) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs?.map((blog) => (
          <li key={blog.id}>
            <div>{blog.title}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
