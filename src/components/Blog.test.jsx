import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import BlogForm from './BlogForm'

test('component displaying a blog renders the title and author, but does not render its URL or number of likes by default', () => {
  const blog = {
    id: 'blogid123',
    author: 'author testing',
    title: 'title testing',
    url: 'http://test.com',
    likes: 0,
    user: {
      _id: 'userid123',
      username: 'username',
      name: 'user',
    },
  }
  const mockUpdate = null
  const mockRemove = null

  const { container } = render(
    <Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove} />
  )

  const titleAuthor = screen.findByText('title testing author testing')
  const detail = container.querySelector('.detail')
  expect(titleAuthor).toBeDefined()
  expect(detail).toHaveStyle('display: none')
})

test('The url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const user = userEvent.setup()
  const mockUpdate = vi.fn()
  const mockRemove = vi.fn()

  const blog = {
    id: 'blogid123',
    author: 'author testing',
    title: 'title testing',
    url: 'http://test.com',
    likes: 0,
    user: {
      _id: 'userid123',
      username: 'username',
      name: 'user',
    },
  }

  const { container } = render(
    <Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove} />
  )

  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const divlike = screen.getByText('like')
  const divurl = screen.getByText('http://test.com')
  const detail = container.querySelector('.detail')

  expect(detail).not.toHaveStyle('display: none')
  expect(divlike).toBeDefined()
  expect(divurl).toBeDefined()
})

test('clicking the like button twice, calls  the event handler the component received as props is called twice', async () => {
  const mockUpdate = vi.fn()
  const mockRemove = vi.fn()

  const blog = {
    id: 'blogid123',
    author: 'author testing',
    title: 'title testing',
    url: 'http://test.com',
    likes: 0,
    user: {
      _id: 'userid123',
      username: 'username',
      name: 'user',
    },
  }

  const { container } = render(
    <Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove} />
  )
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdate.mock.calls).toHaveLength(2)
})

test('<NoteForm /> calls the event handler it recieved as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog} />)
  const input = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(input[0], 'title1')
  await user.type(input[1], 'Jone Smith')
  await user.type(input[2], 'url123')
  await user.click(createButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title1')
  expect(createBlog.mock.calls[0][0].author).toBe('Jone Smith')
  expect(createBlog.mock.calls[0][0].url).toBe('url123')
})
