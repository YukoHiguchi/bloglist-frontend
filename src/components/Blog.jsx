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
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setDetailVisible(!detailVisible)}>
          {detailVisible ? 'hide' : 'view'}
        </button>
        {detailVisible && (
          <div>
            {blog.id} <br />
            {blog.url}
            <br />
            {blog.likes} <button onClick={handleUpdateLikes}>like</button>
            <br />
            {blog?.user?.name}
            <br />
            {removeBlog && <button onClick={handleRemoveBlog}>remove</button>}
          </div>
        )}
      </div>
    </div>
  )
}
export default Blog
