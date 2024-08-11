import React, { createContext, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import storage from '../services/storage'
import loginService from '../services/login'
import { useNotify } from '../context/NotificationContext'
import { setUser, clearUser } from '../slice/userSlice'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const notifyWith = useNotify()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      storage.saveUser(user)
      dispatch(setUser(user))
      notifyWith(`Welcome back, ${user.name}`)
      navigate('/')
    } catch (error) {
      notifyWith('Wrong credentials', 'error')
    }
  }
  const handleLogout = () => {
    notifyWith('loggin out')
    storage.removeUser()
    dispatch(clearUser())
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
