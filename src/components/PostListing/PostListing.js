import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../features-redux/posts/postSlice'
import PostCard from '../PostCard/PostCard';
import { selectFilteredPosts } from '../../features-redux/posts/postSlice';

function PostListing() {
    const posts = useSelector(getAllPosts);
    

    const rendering = () => posts.map((post, key) => {
        return <PostCard key={key} data={post.data} />
    });

    console.log(posts);

    return (
        <div className="post-wrapper">
            <div className="post-container">
             {rendering()}
            </div>
        </div>
    )
}

export default PostListing
