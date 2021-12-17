import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AddAComment, GetAllComments } from "../store/Comments";
import {PlusCommentHandler, MinusCommentHandler} from "../utils/utilities"


function CommentForm({post_id}) {
    const dispatch = useDispatch()
    const [content, setContent] = useState("")
    const history = useHistory()
    const [postId,setPostId] = useState(post_id)

    useEffect(()=>{
        dispatch(GetAllComments(postId))
    },[dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {content, postId}
        dispatch(AddAComment(payload))

        history.push(`/post/${post_Id}`)
    }

    return (
        <div>
        <form className="CommentForm" onSubmit={handleSubmit}>
            <label className="noteForms">
            <textarea
                    id='comment'
                    type="textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Your Comment here"
            />
            </label>
            <button id="submit" type="submit">Submit</button>
        </form>

        <div>
        {
                        props.comments.map(comment => {
                            return <div className="comments">
                                <div>
                                    <div className="plusOne">
                                        <i class="fa fa-angle-up"onClick={() => {PlusCommentHandler(postId)}}></i>
                                    </div>
                                    <div className="minusOne">
                                        <i class="fa fa-angle-down"onClick={() => {MinusCommentHandler(postId)}}></i>
                                    </div>
                                </div>

                                <div>
                                    <div>{comment.body}</div>
                                    <div className="comment-info">Votes{comment.votes}</div>
                                    <div className="comment-info">By: {comment.username}</div>
                                </div>
                            </div>
                        })
                    }
        </div>
        </div>
    )
}


export default CommentForm;
