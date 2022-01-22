import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { AddAComment, GetAllComments, DeleteAComment } from "../store/comments"
import {PlusCommentHandler, MinusCommentHandler} from "../utils/utilities"
import EditForm from "./editform.js"


function CommentForm({post_id}) {
    const dispatch = useDispatch()
    const postId = useParams()
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const [showForm, setShowForm] = useState(false);
    // const [postId,setPostId] = useState(post_id)
    const comments = useSelector((state) => Object.values(state.comments));
    const sessionUser = useSelector((state) => state.session.user);
    const postComments = Object.values(comments)
    let id = parseInt(postId.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {content}
        await dispatch(AddAComment(payload,id))
        setContent("")
        history.push(`/post/${id}`)
    }

    useEffect(()=>{
        dispatch(GetAllComments(id))
    },[dispatch])

    const handleDelete = async (e)=> {
        e.preventDefault();
        await dispatch(DeleteAComment(id))
        history.push(`/post/${id}`)
    }

    let AllComments = []
    for(let i = 0; i < postComments.length; i++){
        if(postComments[i].post_id === id){
            AllComments.unshift(postComments[i])
        }
    }

    function userCheck(userId,commentID,id,content){
        // console.log(sessionUser.id === userId)
        if(sessionUser.id === userId){
        return(
        <div>
            <button
            id="splashlinkbuttons"
            onClick={(e) => {
                e.preventDefault()
                handleDelete()
            }}
            >
                Delete comment
            </button>
            {/* <button className="comment-edit" onClick={() =>
                showForm === false ? setShowForm(true) : setShowForm(false)
                }>
                Edit
            </button>
            {showForm && ( <EditForm id={commentID}/>)} */}
            <NavLink to={`/post/${id}/comment/${commentID}/edit`}exact={true} contents={content}> Edit </NavLink>
        </div>
        )
        }
    };

    if(!sessionUser){
        history.push('/login')
    }
    // else {
    // if (sessionUser.id === AllComments?.user_id) {
    //   userCheck =
    // <div>
    //     <button
    //     id="splashlinkbuttons"
    //     onClick={(e) => {
    //         e.preventDefault()
    //         handleDelete()
    //     }}
    //     >
    //         Delete comment
    //     </button>
    //     <button className="comment-edit" onClick={() =>
    //         showForm === false ? setShowForm(true) : setShowForm(false)
    //         }>
    //         Edit
    //     </button>
    //     {showForm && ( <EditForm id={id}/>)}
    // </div>
    // }
    // }
    // let otherCheck = false;
    // if (sessionUser.id === comments?.user_id) {
    //   otherCheck = true
    // }

    if(postComments){
    return (
        <div>
            {userCheck}
        <form className="CommentForm" onSubmit={handleSubmit}>
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <label className="noteForms">
            <textarea
                    className='comment'
                    type="textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Your Comment here"
                    required={true}
            />
            </label>
            <button className="comment-submit"id="submit" type="submit">Submit</button>
        </form>

        <div>
            <h1>Hello!</h1>
        {
                        AllComments?.map(comment => {
                            return(
                            // console.log("in the map",comment)
                            // let index = 0
                            // index++
                             <div className="comments">
                                {/* <div>
                                    <div className="plusOne"onClick={() => {PlusCommentHandler(postId)}}>
                                        <i class="fa fa-angle-up">up</i>
                                    </div>
                                    <div className="minusOne"onClick={() => {MinusCommentHandler(postId)}}>
                                        <i class="fa fa-angle-down">down</i>
                                    </div>
                                </div> */}

                                <div>
                                    <div>{comment.content}</div>
                                    {/* <div className="comment-info">Votes: {comment.votes}</div> */}
                                    {/* <button className="comment-delete" onClick={() => {
                                        dispatch(DeleteAComment(comment.id))
                                        history.push(`/post/${id}`)
                                        }}>
                                        Delete
                                    </button>
                                    <button className="comment-edit" onClick={() => showForm === false ? setShowForm(true) : setShowForm(false) }>
                                        Edit
                                    </button>
                                    {showForm && ( <EditForm id={comment.id}/>)} */}
                                    {comment.id}
                                    {userCheck(comment.user_id, comment.id,id,comment.content)}
                                </div>
                            </div>
                            )}
                        )}

        </div>
        </div>
    )
                    }
}


export default CommentForm;
