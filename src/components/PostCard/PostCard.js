import React from 'react'

 function PostCard(props) {
    const {data} = props;
   
    /* This function runs through the reddit data to make sure that there is a 
    an image for the post. If so, shows image. If it's text, it shows text 
    and if its a reddit hosted video it will render the video. 
    Youtube videos only show the thumbnail for now
    Gallery-style posts & all else shows empty div*/
  
    const mediaRender = () => {
        if (data.thumbnail !== 'self' && data.thumbnail !== 'default' && data.is_self !== true && data.is_gallery !== true && data.domain !== 'youtu.be' && data.domain !== 'v.redd.it') {
        return <img src = {data.url} alt={data.title} class="img-fluid rounded-start"/>;   
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
                <img src={data.thumbnail} />
            )
        } else {
            return <div></div>
        }       
    }

    const renderSelf = () => {
        if(data.is_self == true) {
            return (<p>{data.selftext}</p>)
        } else {
            return <div></div>
        }
    }

    return (
            <div className="card mb-3" style={{width: "70%"}}>
            <div className="row g-0">
                <div class="col-md-4">
                {mediaRender()}
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{renderSelf()}</p>
                    <p className="card-text"><small className="text-muted">By {data.author}</small></p>
                    <a href="#" className="btn btn-primary">Go to post</a>
                </div>
                </div>
            </div>
            </div>
    )
    }

export default PostCard