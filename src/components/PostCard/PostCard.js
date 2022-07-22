import React from 'react'
import parse from 'html-react-parser';
import {Link} from 'react-router-dom';


 function PostCard(props) {
    const {data} = props;
 

   /* Function to change escaped HTML to string */
    const htmlDecode = (input) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }

    /* Decode reddit JSON's youtube embed HTML */
    const youtubeHtmlString = htmlDecode(data.media_embed.content);

    /*Decode reddit JSON's selftext HTML*/

    const crosspostHtml = htmlDecode(data.selftext_html);
   

          /* If a gallery, render through gallery images and load into carousel */
          const renderGallery = () => {
            return Object.keys(data.media_metadata).map((key, indx) => {
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
                <div className="Container overflow-auto">
                    {parse(youtubeHtmlString)}
                </div>
            )
        } if (data.is_gallery == true) {
            return (
                <div id={data.id} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {renderGallery()}
                        
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${data.id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${data.id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )
            /* If the post contains a crosspost from a different author, renders gallery*/       
        } if(data.hasOwnProperty("crosspost_parent")) {
            
    

            return data.crosspost_parent_list.map((crosspost) => {
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
        if(data.is_self == true) {
            return (<p>{parse(crosspostHtml)}</p>)
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