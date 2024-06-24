import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Nortification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(true)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(sortByLikes(blogs))
    })
  }, [])

  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => {
      if (a.likes > b.likes) {
        return 1
      } else if (a.likes < b.likes) {
        return -1
      } else {
        return 0
      }
    })
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsSuccess(false)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(sortByLikes(blogs.concat(returnedBlog)))
        setIsSuccess(true)
        setMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    } catch (exception) {
      setMessage('something wrong happended while adding a blog')
      setIsSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = (blogObject) => {
    try {
      blogService.update(blogObject.id, blogObject).then((returnedBlog) => {
        setBlogs(
          blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog))
        )
        setIsSuccess(true)
        setMessage(
          `the blog ${returnedBlog.title} by ${returnedBlog.author} was updated`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    } catch (exception) {
      setMessage('something wrong happended while updating a blog')
      setIsSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlog = (id) => {
    try {
      blogService.remove(id).then((response) => {
        setBlogs(blogs.filter((blog) => blog.id !== id))
      })
    } catch (exception) {
      console.log('exception', exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification isSuccess={isSuccess} message={message} />

        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification isSuccess={isSuccess} message={message} />
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={
            user.username === blog?.user?.username ? removeBlog : null
          }
        />
      ))}
    </div>
  )
}

export default App
