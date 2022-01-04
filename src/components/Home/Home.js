import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostListing from '../PostListing/PostListing'
import { fetchAsyncPosts } from '../../features-redux/posts/postSlice';
import { getPostComments } from '../../features-redux/posts/postSlice';
function Home() {
 
    const dispatch = useDispatch();

    const subreddit = useSelector((state) => state.posts.selectedSubreddit);
  
    useEffect(() => {
        dispatch(fetchAsyncPosts(subreddit));
    }, [dispatch, subreddit]);

 
    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                     <h1 className="display-4">Welcome to Tasteful Reddit</h1>
                    <p className="lead"><strong>A place to find the tastiest Reddit posts!</strong> Toggle between subreddits above to view their posts and recipes.
                    Most of these subreddit recipes are found in the post's comments, please go to each
                    individual post to see them.</p>
                 </div>
        </div>
            <PostListing />
        </div>
    )
}

export default Home
