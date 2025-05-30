import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "../lib/axios";

// Async thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get("/api/posts");
  return res.data;
});

export const createPost = createAsyncThunk("posts/createPost", async (data) => {
  const res = await axios.post("/api/posts", data);
  return res.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, ...data }) => {
    const res = await axios.put(`/api/posts/${id}`, data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`/api/posts/${id}`);
  return id;
});

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: true,
    filter: "",
    error: null,
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // DELETE
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const selectFilteredPosts = createSelector(
  [(state) => state.posts.items, (state) => state.posts.filter],
  (posts, filter) => {
    if (!filter) return posts;
    return posts.filter((post) =>
      post.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const { setFilter } = postSlice.actions;
export default postSlice.reducer;
