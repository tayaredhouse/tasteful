import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../features-redux/posts/postSlice'
import { useState } from 'react';
import PostCard from '../PostCard/PostCard';

function PostListing() {
    const posts = useSelector(getAllPosts);

    const rendering = () => posts.map((post, key) => {
        return <PostCard key={key} data={post.data} />;
    });

    console.log(rendering())
  
    return (
        <div className="post-wrapper">
            <h2>Recipes</h2>
            <div className="post-container">
             {rendering()}
            </div>
        </div>
    )
}

export default PostListing
