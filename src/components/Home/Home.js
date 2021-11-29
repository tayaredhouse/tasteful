import React, {useEffect} from 'react'
import redditApi from '../../common/api/redditApi';
import { addPosts } from '../../features-redux/posts/postSlice';
import { useDispatch } from 'react-redux';
import PostListing from '../PostListing/PostListing'

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await redditApi.get('recipes.json')
            .catch((err) => {
                console.log("Err :", err);
            });
            dispatch(addPosts(response.data.data.children));
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <PostListing />
        </div>
    )
}

export default Home
