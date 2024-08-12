import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import ListGroup from 'react-bootstrap/ListGroup'

const User = () => {
  const { userId } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId),
  })

  if (isLoading) return null
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ListGroup>
        {user.blogs?.map((blog) => (
          <ListGroup.Item key={blog.id} className="border p-2 mb-1">
            <div>{blog.title}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
