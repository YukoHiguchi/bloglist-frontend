import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
const UserIndex = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })
  if (isLoading) return null
  return (
    <div>
      <h2>Users</h2>
      {users.length && <div>blogs created</div>}
      {users?.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
          <div>{user.blogs.length}</div>
        </div>
      ))}
    </div>
  )
}

export default UserIndex
