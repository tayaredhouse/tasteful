import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import redditApi from '../../common/api/redditApi';


export const fetchAsyncPosts = createAsyncThunk('posts/fetchAsyncPosts', async (subreddit) => {
    const response = await redditApi.get(subreddit)
    return response.data.data.children;
});


const initialState = {
    posts: [],
    selectedSubreddit: 'recipes.json'
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    addPosts: (state, { payload }) => {
        state.posts = payload;
    },
    setSelectedSubreddit(state, action) {
        state.selectedSubreddit = action.payload;
    }
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

export const {addPosts, setSelectedSubreddit} = postSlice.actions;

export const selectSelectedSubreddit = (state) => state.selectedSubreddit;


export default postSlice.reducer;

export const getAllPosts = (state) => state.posts.posts;