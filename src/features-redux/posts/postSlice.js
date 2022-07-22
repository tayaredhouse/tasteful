import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import redditApi from '../../common/api/redditApi';
import { createSelector } from '@reduxjs/toolkit';

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
    selectedPost: [],
    search: ''
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
        state.search = '';
    },
    setSearchTerm(state, action) {
        state.search = action.payload;
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

export const {addPosts, setSelectedSubreddit, addSelectedPost, setSearchTerm} = postSlice.actions;
export const selectSelectedSubreddit = (state) => state.selectedSubreddit;
export const getAllPosts = (state) => state.posts.posts;
export const getSelectedPost = (state) => state.posts.selectedPost;
export default postSlice.reducer;

export const selectSearchTerm = (state) => state.posts.searchTerm;

export const selectFilteredPosts = createSelector(
  [getAllPosts, selectSearchTerm],
  (posts, search) => {
    if (search !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return posts;
  }
);
