import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { AddAComment, GetAllComments,DeleteAComment } from "../store/comments"
import {PlusCommentHandler, MinusCommentHandler} from "../utils/utilities"


function CommentForm({post_id}) {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const postId = useParams()
    const [content, setContent] = useState("")
    const history = useHistory()
    // const [postId,setPostId] = useState(post_id)
    const singlcomment = useSelector((state) => state.comments.comments);
    const comments = useSelector((state) => state.comments.comments);
    let id = postId.id

    useEffect(()=>{
        dispatch(GetAllComments(postId))
    },[dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {content}
        dispatch(AddAComment(payload,id))

        history.push(`/post/${id}`)
    }

    const handleDelete = (e)=> {
        // e.preventDefault();
        dispatch(DeleteAComment(id))
          history.push(`/discover`)
      }

    let userCheck;
    if (sessionUser.id === comments?.user_id) {
      userCheck = <button
      id="splashlinkbuttons"
      onClick={() => {
        handleDelete()
      }}
    >
      Delete Song
    </button>
    }
    let otherCheck;
    if (sessionUser.id === comments?.user_id) {
      otherCheck = <UpdateForm id={comments.id}/>
    }

    const [showForm, setShowForm] = useState(false);

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
                        comments.map(comment => {
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
                                    <div>{comment.content}</div>
                                    <div className="comment-info">Votes{comment.votes}</div>
                                    <div className="comment-info">By: {comment.username}</div>
                                    <button className='x'
                                    id="splashlinkbuttons"
                                    onClick={() => {dispatch(DeleteAComment(comment.id))
                                    history.push(`/song-page/${comments.id}`)
                                    }}>
                                        X
                                    </button>
                                    <button className='e' onClick={() => showForm === false ? setShowForm(true) : setShowForm(false)} id="splashlinkbuttons">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        })
                    }
        </div>
        </div>
    )
}


export default CommentForm;
