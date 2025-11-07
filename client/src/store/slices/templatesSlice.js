import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'
import { toast } from 'react-toastify'

// ---- Fetch Templates ----
export const fetchTemplates = createAsyncThunk('templates/fetchAll', async (params = {}, { rejectWithValue }) => {
    try {
        const res = await api.get('/templates', { params })
        return res.data
    } catch (err) {
        const msg = err.response?.data?.message || 'Failed to load templates'
        return rejectWithValue(msg)
    }
})

// ---- Favorites ----
export const fetchFavorites = createAsyncThunk('templates/fetchFavorites', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/favorites')
        return res.data
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to load favorites')
    }
})

export const addFavorite = createAsyncThunk('templates/addFavorite', async (templateId, { rejectWithValue }) => {
    try {
        await api.post(`/favorites/${templateId}`)
        toast.success('Added to favorites') 
        return templateId
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to add favorite')
    }
})

export const removeFavorite = createAsyncThunk('templates/removeFavorite', async (templateId, { rejectWithValue }) => {
    try {
        await api.delete(`/favorites/${templateId}`)
        toast.info('Removed from favorites')
        return templateId
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to remove favorite')
    }
})

// ---- Create Template ----
export const createTemplate = createAsyncThunk('templates/create', async (payload, { rejectWithValue }) => {
    try {
        const formData = new FormData()
        for (const key in payload) formData.append(key, payload[key])

        const res = await api.post('/templates', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        toast.success('Template created')
        return res.data
    } catch (err) {
        const msg = err.response?.data?.message || 'Create failed'
        toast.error(msg)
        return rejectWithValue(msg)
    }
})

// ---- Delete Template ----
export const deleteTemplate = createAsyncThunk('templates/delete', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/templates/${id}`)
        toast.success('Template deleted')
        return id
    } catch (err) {
        const msg = err.response?.data?.message || 'Delete failed'
        toast.error(msg)
        return rejectWithValue(msg)
    }
})

// ---- Update Template ----
export const updateTemplate = createAsyncThunk('templates/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    // Debug: print formData properly
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await api.put(`/templates/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    toast.success('Template updated');
    return res.data;
  } catch (err) {
    const msg = err.response?.data?.message || 'Update failed';
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

// ---- Fetch Single Template with Related Templates ----
export const fetchTemplateById = createAsyncThunk(
  'templates/fetchById',
  async (id, { rejectWithValue }) => {
    try {
        
      const res = await api.get(`/templates/${id}`);
      
      // Expected response: { template: {...}, relatedTemplates: [...] }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load template');
    }
  }
);


// ---- Slice ----
const templatesSlice = createSlice({
  name: 'templates',
  initialState: {
  items: [],
  favorites: [],
  currentTemplate: null, // ⬅ for single template
  relatedTemplates: [],  // ⬅ for related templates
  status: 'idle',
  loading: false,
  error: null
},

  reducers: {},
  extraReducers(builder) {
    builder
      // ---- Fetch Templates ----
      .addCase(fetchTemplates.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.loading = false
      })

      // ---- Favorites ----
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload)
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          f => (f._id ? f._id !== action.payload : f !== action.payload)
        )
      })

      // ---- Create Template ----
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })

      // ---- Delete Template ----
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload)
      })

      // ---- Update Template ----
      .addCase(updateTemplate.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
      })
       .addCase(fetchTemplateById.pending, (state) => {
  state.status = 'loading';
  state.loading = true;
  state.error = null;
  state.currentTemplate = null;
  state.relatedTemplates = [];
})
.addCase(fetchTemplateById.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.currentTemplate = action.payload; // <- use payload directly
  state.relatedTemplates = []; // optionally fetch related templates later
  state.loading = false;
})
.addCase(fetchTemplateById.rejected, (state, action) => {
  state.status = 'failed';
  state.error = action.payload;
  state.loading = false;
  state.currentTemplate = null;
  state.relatedTemplates = [];
})

  }
})

export default templatesSlice.reducer
