import { useState } from 'react'
const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const handleUpdateLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(newBlog)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='title-author'>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setDetailVisible(!detailVisible)}>
          {detailVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div className='detail' style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          <span className='likes'>{blog.likes}</span>{' '}
          <button onClick={handleUpdateLikes}>like</button>
        </div>
        <div className='bloguser'>{blog?.user?.name}</div>
        {removeBlog && <button onClick={handleRemoveBlog}>delete</button>}
      </div>
    </div>
  )
}
export default Blog
