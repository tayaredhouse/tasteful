import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import PostListing from '../PostListing/PostListing'
import { fetchAsyncPosts } from '../../features-redux/posts/postSlice';
function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncPosts());
    }, [dispatch]);

    return (
        <div>
            <PostListing />
        </div>
    )
}

export default Home
