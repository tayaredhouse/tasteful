import React from 'react'
import parse from 'html-react-parser';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSelectedPost } from '../../features-redux/posts/postSlice';
 function PostCard(props) {
    const {data} = props;
    const dispatch = useDispatch();

   /* Function to change escaped HTML to string */
    const htmlDecode = (input) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }

    /* Decode reddit JSON's youtube embed HTML */
    const youtubeHtmlString = htmlDecode(data.media_embed.content);
   

    /* This function runs through the reddit data to make sure that there is a 
    an image for the post. If so, shows image
    and if its a reddit hosted video or youtube video it will render the video. 
    Gallery-style posts & all else shows empty div*/
  
     const mediaRender = () => {
        if (data.thumbnail !== 'self' && data.thumbnail !== 'default' && data.is_self !== true && data.is_gallery !== true && data.domain !== 'youtu.be' && data.domain !== 'v.redd.it') {
        return <img src = {data.url} alt={data.title} className="card-img-top"/>;   
        } if ( data.is_video == true) {
            return (
            <div>
                <video controls preload = "none">
                    <source src={data.media.reddit_video.fallback_url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
          ) 
        } if (data.domain == 'youtu.be') {
            return (
                <div className="Container">
                    {parse(youtubeHtmlString)}
                </div>
            )
        } else {
            return <div></div>
        }       
    }

    /* If only text & no photos, render text info*/

    const renderSelf = () => {
        if(data.is_self == true) {
            return (<p>{data.selftext}</p>)
        } else {
            return <p></p>
        }
    }


    return (
            <div className="card mb-3 mx-auto text-center" style={{width: "70%"}}>
               <div className="row g-0">
                 <div className="col-md-5">
                    {mediaRender()}
                 </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">{parse(data.title)}</h5>
                    <div className="card-text">{renderSelf()}</div>
                    <div className="card-text"><small className="text-muted">By {data.author}</small></div>
                        <Link to={`/post/${data.id}`}
                         state={{ from: data}}>
                            <button className="btn btn-primary">Go to post</button>
                        </Link>
                    </div>
                   </div>
                </div>
            </div> 


    )
    }

export default PostCard