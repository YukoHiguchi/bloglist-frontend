import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useNotify } from '../context/NotificationContext'
import blogService from '../services/blogs'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import ListGroup from 'react-bootstrap/ListGroup'

const Blogs = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: blogService.getAll,
    stateTime: Infinity,
    cacheTime: 0,
  })

  const { mutateAsync: addBlogMutation } = useMutation({
    mutationFn: blogService.create,
    onSuccess: (data) => {
      notifyWith(`Blog created: ${data.title}, ${data.author}`)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleCreate = async (blog) => {
    await addBlogMutation(blog)
  }

  const byLikes = (a, b) => b.likes - a.likes

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <h1>Blog list</h1>
      <Togglable buttonLabel="create new blog">
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      <ListGroup className="blog-list">
        {blogs.sort(byLikes).map((blog) => (
          <ListGroup.Item
            as={Link}
            action
            className="border p-2 mb-1"
            to={`/blogs/${blog.id}`}
            key={blog.id}
          >
            {blog.title} {blog.author} {blog.id}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}
export default Blogs
