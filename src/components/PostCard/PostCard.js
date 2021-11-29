import React from 'react'

 function PostCard(props) {
    const {data} = props;


    return (
        <div className ="card-item">
            <div className="card-inner">
                <div className="card-top">
                <h3>{data.title} </h3>
                <p>By {data.author}</p>
                <img src = {data.url}/>
                </div>
            </div>
        </div>
    )
    }

export default PostCard