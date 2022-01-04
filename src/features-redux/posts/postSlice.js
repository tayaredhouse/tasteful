import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import redditApi from '../../common/api/redditApi';
import postCommentApi from '../../common/api/postCommentApi';

export const fetchAsyncPosts = createAsyncThunk('posts/fetchAsyncPosts', async (subreddit) => {
    const response = await redditApi.get(subreddit)
    return response.data.data.children;
});


export const getPostComments = createAsyncThunk('posts/getPostComments', async (permalink) => {
    const response = await fetch(`http://www.reddit.com${permalink}.json`);
    const json = await response.json();
  
    return json[1].data.children.map((comment) => comment.data)
  });

const initialState = {
    posts: [],
    selectedSubreddit: 'recipes.json',
    selectedPost: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    addPosts: (state, { payload }) => {
        state.posts = payload;
    },
    addSelectedPost: (state, {payload}) => {
        state.selectedPost = payload;
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
      [getPostComments.fulfilled] : (state, {payload}) => {
        console.log("Fulfilled");
        return {...state, selectedPost: payload};
      },
    },
});

export const {addPosts, setSelectedSubreddit, addSelectedPost} = postSlice.actions;
export const selectSelectedSubreddit = (state) => state.selectedSubreddit;
export const getAllPosts = (state) => state.posts.posts;
export const getSelectedPost = (state) => state.posts.selectedPost;
export default postSlice.reducer;
