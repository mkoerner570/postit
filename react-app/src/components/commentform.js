import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { AddAComment, GetAllComments, DeleteAComment } from "../store/comments"
import {PlusCommentHandler, MinusCommentHandler} from "../utils/utilities"
import EditForm from "./editform.js"


function CommentForm({post_id}) {
    const dispatch = useDispatch()
    const postId = useParams()
    const [content, setContent] = useState("")
    const history = useHistory()
    const [showForm, setShowForm] = useState(false);
    // const [postId,setPostId] = useState(post_id)
    const comments = useSelector((state) => state.comments.comments);
    const sessionUser = useSelector((state) => state.session.user);
    const postComments = Object.values(comments)
    let id = parseInt(postId.id)

    useEffect(()=>{
        dispatch(GetAllComments(id))
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
          history.push(`/post/${id}`)
    }

    let userCheck;
    if (sessionUser.id === comments?.user_id) {
      userCheck = <button
      id="splashlinkbuttons"
      onClick={() => {
        handleDelete()
      }}
    >
      Delete comment
    </button>
    }
    let otherCheck = false;
    if (sessionUser.id === comments?.user_id) {
      otherCheck = true
    }

    console.log(postComments)
    return (
        <div>
            {userCheck}
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
                        postComments.map(comment => {
                            console.log("in the map",comment[0].content)
                            let index = -1
                            index++
                            return <div className="comments">
                                <div>
                                    <div className="plusOne"onClick={() => {PlusCommentHandler(postId)}}>
                                        <i class="fa fa-angle-up">up</i>
                                    </div>
                                    <div className="minusOne"onClick={() => {MinusCommentHandler(postId)}}>
                                        <i class="fa fa-angle-down">down</i>
                                    </div>
                                </div>

                                <div>
                                    <div>{comment[index].content}</div>
                                    <div className="comment-info">Votes: {comment.votes}</div>
                                    <button onClick={() => {
                                        dispatch(DeleteAComment(comment.id))
                                        history.push(`/post/${id}`)
                                        }}>
                                        Delete
                                    </button>
                                    <button onClick={() => showForm === false ? setShowForm(true) : setShowForm(false) }>
                                        Edit
                                    </button>
                                    {showForm && ( <EditForm id={comment.id}/>)}
                                </div>
                            </div>
                        },
                        )
                    }
        </div>
        </div>
    )
}


export default CommentForm;
