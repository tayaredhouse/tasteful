import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getPostComments } from '../../features-redux/posts/postSlice';
import {useLocation} from 'react-router-dom';
import { getSelectedPost } from '../../features-redux/posts/postSlice';
import Comments from '../../Comments/Comments';

function PostDetails() {
    const location = useLocation();
    const {from} = location.state;
    const comments = useSelector(getSelectedPost);

    
    const dispatch = useDispatch();
  
       
    useEffect( () => {
        dispatch(getPostComments(from.permalink));
    }, [dispatch]);
   
    const renderComments = () => {
        return comments.map((comment, key) => {
            return (
                <ul class="list-group-flush">
                <Comments key={key} comment={comment} />
                </ul>
            )
        })
    }

    const mediaRender = () => {
        if (from.thumbnail !== 'self' && from.thumbnail !== 'default' && from.is_self !== true && from.is_gallery !== true && from.domain !== 'youtu.be' && from.domain !== 'v.redd.it') {
        return <img src = {from.url} alt={from.title} className="card-img-top"/>;   
        } if ( from.is_video == true) {
            return (
            <div>
                <video controls preload = "none">
                    <source src={from.media.reddit_video.fallback_url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
          ) 
        } if (from.domain == 'youtu.be') {
            return (
                <div className="Container">
                
                </div>
            )
        } else {
            return <div></div>
        }       
    }

    /* If only text & no photos, render text info*/

    const renderSelf = () => {
        if(from.is_self == true) {
            return (<p>{from.selftext}</p>)
        } else {
            return <p></p>
        }
    }

    return (
        <div>
            <div class="card mx-auto" style={{width: "75%"}}>
            {mediaRender()}
            <div class="card-body">
                <h5 class="card-title">{from.title}</h5>
                <p class="card-text">{renderSelf()}</p>
            </div>
            <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Comments
                            </button>
                        </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            {renderComments()}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default PostDetails
