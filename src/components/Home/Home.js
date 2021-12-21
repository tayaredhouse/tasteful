import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostListing from '../PostListing/PostListing'
import { fetchAsyncPosts } from '../../features-redux/posts/postSlice';

function Home() {
 
    const dispatch = useDispatch();

    const subreddit = useSelector((state) => state.posts.selectedSubreddit);
  
    useEffect(() => {
        dispatch(fetchAsyncPosts(subreddit));
    }, [subreddit]);

 
    return (
        <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container text-center">
                     <h1 class="display-4">Welcome to Tasteful Reddit</h1>
                    <p class="lead">Toggle between subreddits above to view their recipes.</p>
                 </div>
        </div>
            <PostListing />
        </div>
    )
}

export default Home
