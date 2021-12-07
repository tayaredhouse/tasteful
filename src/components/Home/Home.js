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
            <PostListing />
        </div>
    )
}

export default Home
