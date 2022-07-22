import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getPostComments } from '../../features-redux/posts/postSlice';
import {useLocation} from 'react-router-dom';
import { getSelectedPost } from '../../features-redux/posts/postSlice';
import Comments from '../../Comments/Comments';
import parse from 'html-react-parser';


function PostDetails() {
    const location = useLocation();
    const {from} = location.state;
    const comments = useSelector(getSelectedPost);

    
    const dispatch = useDispatch();
  
       
    useEffect( () => {
        dispatch(getPostComments(from.permalink));
    }, [dispatch, from.permalink]);
   
    /* Function to change escaped HTML to string */
    const htmlDecode = (input) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }

    /* Decode reddit JSON's youtube embed HTML */
    const youtubeHtmlString = htmlDecode(from.media_embed.content);
   

    const renderComments = () => {
        return comments.map((comment, key) => {
            return (
                <ul className="list-group-flush">
                <Comments key={key} comment={comment} />
                </ul>
            )
        })
    }
    
      /* If a gallery, render through gallery images and load into carousel */
      const renderGallery = () => {
        return Object.keys(from.media_metadata).map((key, indx) => {
            console.log(key)
            const indexCheck = () => {
                if (indx == 0) {
                return "carousel-item active";
            } else {
                return "carousel-item";
            }
        }

            return (<div className={indexCheck()}>
                        <img indx={indx} src={`https://i.redd.it/${key}.jpg`}
                        className="img-fluid d-block card-img-top"/>
                    </div>)
    });
}

    const mediaRender = () => {
        if (from.thumbnail !== 'self' && from.thumbnail !== 'default' && from.is_self == false && from.is_gallery == false || from.is_gallery == null && from.domain !== 'youtu.be' && from.domain !== 'v.redd.it') {
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
                <div className="Container mx-auto">
                     {parse(youtubeHtmlString)}
                </div>
            )
        } if (from.is_gallery == true) {
        
            return (
                <div id={from.id} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {renderGallery()}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${from.id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${from.id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            )       
                
              
        } if(from.hasOwnProperty("crosspost_parent")) {
            
    

            return from.crosspost_parent_list.map((crosspost) => {
                if(crosspost.hasOwnProperty("media_metadata")) {

                    const renderCrosspost = () => {
                        return Object.keys(crosspost.media_metadata).map((key, indx) => {
                            console.log(key)
                            const indexCheck = () => {
                                if (indx == 0) {
                                return "carousel-item active";
                            } else {
                                return "carousel-item";
                            }
                        }
                                return <div className={indexCheck()}>
                                        <img index={indx} src={`https://i.redd.it/${key}.jpg`}
                                        className="img-fluid card-img-top"/>
                                    </div>
                    });
                }

        

                    return (
                        <div id={crosspost.id} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {renderCrosspost()}
                                
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#${crosspost.id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#${crosspost.id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    )

                }

            })


        } else {
            return <div></div>
        }       
    }

    /* If only text & no photos, render text info*/

    const renderSelf = () => {
        if(from.is_self == true) {
            return (<p className="card-text">{from.selftext}</p>)
        } else {
            return <p></p>
        }
    }

  
    return (
        <div>
            <div className="card mx-auto" style={{width: "75%"}}>
            {mediaRender()}
            <div className="card-body">
                <h5 className="card-title">{from.title}</h5>
                <p>By {from.author}</p>
                {renderSelf()}
            </div>
            <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Comments
                            </button>
                        </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
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
