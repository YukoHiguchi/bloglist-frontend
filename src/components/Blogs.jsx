import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useNotify } from '../context/NotificationContext'
import blogService from '../services/blogs'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const Blogs = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const { data: blogs, isLoading } = useQuery({
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
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: 'block',
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.sort(byLikes).map((blog) => (
        <Link style={style} to={`/blogs/${blog.id}`} key={blog.id}>
          {blog.title} {blog.author} {blog.id}
        </Link>
      ))}
    </div>
  )
}
export default Blogs
