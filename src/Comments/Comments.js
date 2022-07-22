import React from 'react'
import Replies from './Replies';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
function Comments(props) {
    const {comment} = props;


    const renderReplies = () => {
        if (comment.replies == "" || comment.replies == null) {
             return <div></div>
             
        } else if (comment.replies !== "") {
            return comment.replies.data.children.map((reply, key) => {
                return (
               <ul className="list-group-flush">
                <Replies key={key} reply={reply} />
                </ul>
                )
           })
        }
    }

    return (
        <div>
        <li className="list-group-item"><strong>{comment.author}</strong> <ReactMarkdown>{comment.body}</ReactMarkdown></li>
                {renderReplies()}
            
        
        </div>
    )
}

export default Comments
