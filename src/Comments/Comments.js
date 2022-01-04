import React from 'react'
import Replies from './Replies';

function Comments(props) {
    const {comment} = props;


    const renderReplies = () => {
        if (comment.replies == "" || comment.replies == null) {
             return <div></div>
             
        } else if (comment.replies !== "") {
            return comment.replies.data.children.map((reply, key) => {
                return (
               <ul class="list-group-flush">
                <Replies key={key} reply={reply} />
                </ul>
                )
           })
        }
    }

    console.log(renderReplies())
    return (
        <div>
        <li class="list-group-item"><strong>{comment.author}</strong> {comment.body}</li>
                {renderReplies()}
            
        
        </div>
    )
}

export default Comments
