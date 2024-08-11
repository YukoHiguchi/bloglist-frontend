import { createSlice } from '@reduxjs/toolkit'
import storage from '../services/storage'

const initialState = {
  user: storage.loadUser() ? storage.loadUser() : null,
  isAuthenticated: !!storage.loadUser(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
