import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

  const { data: blog, isLoading } = useQuery({
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

  if (isLoading) return null

  const canRemove = blog?.user ? blog.user.username === user.username : true

  return (
    <div>
      <div className="blog">
        <h2>
          {blog.title} {blog.author}
        </h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
            like
          </button>
        </div>
        <div>added by {blog?.user.username}</div>
        {canRemove && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
      <div className="comments">
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            name="content"
            aria-label="comment"
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments &&
            blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
