import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchUsersGithub, searchRepositoriesGithub } from '../services/githubApi';

export const searchUsers = createAsyncThunk(
  'search/users',
  async ({ query, page }, { getState, rejectWithValue }) => {
    const { resultsCache } = getState().search;
    const cacheKey = `${query}-${page}-users`;

    if (resultsCache[cacheKey]) {
      return { items: resultsCache[cacheKey], cached: true };
    }

    try {
      const response = await searchUsersGithub(query, page);
      return { items: response.items, totalCount: response.total_count };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchRepositories = createAsyncThunk(
  'search/repositories',
  async ({ query, page }, { getState, rejectWithValue }) => {
    const { resultsCache } = getState().search;
    const cacheKey = `${query}-${page}-repositories`;

    if (resultsCache[cacheKey]) {
      return { items: resultsCache[cacheKey], cached: true };
    }

    try {
      const response = await searchRepositoriesGithub(query, page);
      return { items: response.items, totalCount: response.total_count };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    resultsCache: {},
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchType: 'users',
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        const { items, totalCount, cached } = action.payload;
        const cacheKey = `${state.query}-${state.currentPage}-users`;

        state.loading = false;
        state.results = items;
        if (!cached) {
          state.resultsCache[cacheKey] = items; // Cache the results if not cached
          state.totalPages = Math.ceil(totalCount / 30); // Update total pages based on new data
        }
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRepositories.fulfilled, (state, action) => {
        const { items, totalCount, cached } = action.payload;
        const cacheKey = `${state.query}-${state.currentPage}-repositories`;

        state.loading = false;
        state.results = items;
        if (!cached) {
          state.resultsCache[cacheKey] = items; // Cache the results if not cached
          state.totalPages = Math.ceil(totalCount / 30); // Update total pages based on new data
        }
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, setSearchType, setCurrentPage } = searchSlice.actions;

export default searchSlice.reducer;