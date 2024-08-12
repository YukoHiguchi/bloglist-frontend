import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

import blogService from '../services/blogs'
import { useNotify } from '../context/NotificationContext'

const Blog = () => {
  let { blogId } = useParams()
  const notifyWith = useNotify()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [content, setContent] = useState('')

  const user = useSelector((state) => state.user.user)

  const { mutateAsync: addCommentMutation } = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', blogId] })
    },
  })
  const handleComment = async (event) => {
    event.preventDefault()
    const obj = { id: blogId, content: content }
    await addCommentMutation(obj)
    setContent('')
  }

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', blogId],
    queryFn: () => blogService.getBlogById(blogId),
  })

  const { mutateAsync: updateBlogMutation } = useMutation({
    mutationFn: blogService.update,
    onSuccess: (data) => {
      notifyWith(`You liked ${data.title} by ${data.author}`)
      queryClient.invalidateQueries({ queryKey: ['post', blogId] })
    },
  })

  const handleVote = async (blog) => {
    await updateBlogMutation({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const { mutateAsync: deleteBlogMutation } = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (data, variables) => {
      notifyWith(`Blog ${variables.title}, by ${variables.author} removed`)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
    },
  })
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlogMutation(blog)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  const canRemove = blog?.user ? blog.user.username === user.username : true

  return (
    <div>
      <div className="blog">
        <h1>
          {blog.title} {blog.author}
        </h1>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <Button className="ms-2 btn-sm" onClick={() => handleVote(blog)}>
            like
          </Button>
        </div>
        <div>added by {blog?.user.username}</div>
        {canRemove && (
          <Button className="my-3" onClick={() => handleDelete(blog)}>
            remove
          </Button>
        )}
      </div>
      <div className="comments">
        <h2>comments</h2>
        <Form onSubmit={handleComment} className="mb-4">
          <Form.Group className="mb-3" controlId="formGridComment">
            <Form.Control
              placeholder="comment"
              name="content"
              aria-label="comment"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
          </Form.Group>
          <Button type="submit">add comment</Button>
        </Form>
        <ListGroup as="ol" numbered>
          {blog.comments &&
            blog.comments.map((comment) => (
              <ListGroup.Item as="li" key={comment.id}>
                {comment.content}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  )
}

export default Blog
