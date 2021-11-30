import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import redditApi from '../../common/api/redditApi';

export const fetchAsyncPosts = createAsyncThunk('posts/fetchAsyncPosts', async () => {
    const response = await redditApi.get('recipes.json')
    return response.data.data.children;
});

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    addPosts: (state, { payload }) => {
        state.posts = payload;
    },
  },
  extraReducers: {
      [fetchAsyncPosts.pending] : () => {
          console.log("Pending");
      },
      [fetchAsyncPosts.fulfilled] : (state, {payload}) => {
          console.log("Fulfilled");
          return {...state, posts: payload};
      },
      [fetchAsyncPosts.rejected]: () => {
          console.log("Rejected");
      },
    },
});

export const {addPosts} = postSlice.actions;
export default postSlice.reducer;
export const getAllPosts = (state) => state.posts.posts;