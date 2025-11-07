import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'
import { toast } from 'react-toastify'

// fetch current user (reads cookie on server)
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/me')
    return res.data.user
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch user')
  }
})

export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', payload)
    toast.success('Registered successfully')
    return res.data.user
  } catch (err) {
    const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Register failed'
    toast.error(msg)
    return rejectWithValue(msg)
  }
})

export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', payload)
    toast.success('Logged in')
    return res.data.user
  } catch (err) {
    const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Login failed'
    toast.error(msg)
    return rejectWithValue(msg)
  }
})

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/auth/logout')
    toast.success('Logged out')
    return null
  } catch (err) {
    const msg = err.response?.data?.message || 'Logout failed'
    toast.error(msg)
    return rejectWithValue(msg)
  }
})



const authSlice = createSlice({
  name: 'auth',
  initialState: { user: JSON.parse(localStorage.getItem('user')) || null, status: 'idle', error: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null
        state.status = 'failed'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
