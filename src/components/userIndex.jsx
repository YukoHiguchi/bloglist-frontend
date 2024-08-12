import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const UserIndex = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })
  if (isLoading) return null
  return (
    <div>
      <h2>Users</h2>
      {users.length && (
        <Row className="border-bottom pb-2">
          <Col xs={6}>Name</Col>
          <Col xs={6}>Blogs created</Col>
        </Row>
      )}
      {users?.map((user) => (
        <Row key={user.id}>
          <Col xs={6} as={Link} to={`/users/${user.id}`}>
            {user.name}
          </Col>
          <Col xs={6}>{user.blogs.length}</Col>
        </Row>
      ))}
    </div>
  )
}

export default UserIndex
