import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UpdateAComment} from "../store/comments"
import { GetOneComment } from "../store/single"
import {GetOnePost} from "../store/single"

function EditForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const id = useParams();
    const comment = useSelector((state) =>state.single.singleComment)
    const post = useSelector((state) => state.single.singlePost)
    const [content, setContent] = useState(comment?.content)
    // const [content, setContent] = useState("")
    console.log(comment?.content)

    useEffect(async ()=>{
        await dispatch(GetOnePost(post?.id))
        // setContent(comment?.contents)
    },[dispatch])

    useEffect( async() => {
        await dispatch(GetOneComment(parseInt(id.id)))
        // setContent(comment?.contents)
    }, [dispatch])

    useEffect(async()=>{
        console.log("++++++",comment?.content)
        setContent(comment?.content)
    },[dispatch,comment])


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { content }
        dispatch(UpdateAComment(payload, id))
        setContent("")
        history.push(`/post/${comment.post_id}`);
    }

    return (
    <div>
        <div className="postPage-container">

        <div className="the-post">
            <div className="details">
                <div className="Post-V">

                </div>
                    <div className="post-title">{post?.title} </div>
                </div>

                <div>
                    <img className="post-body" alt="" src={post?.body}/>
                    <div className="post-info">
                        {/* Posted By: {posts.user_id} on subreadit:
                        <span style={{ color: "#007BFD", cursor: "pointer" }}>
                            <Link to={`/r/${posts?.sub_id}`}>
                                /r/{posts?.sub_id}
                            </Link>
                        </span> */}
                            {/* {sessionUser.id === posts?.id}
                                        <button className="comment-delete" onClick={()=>{handleDelete(posts.id)}}>
                                            delete
                                              </button>

                        {sessionUser.id === posts?.user_id} */}
                                        {/* <button onClick={()=>{handleDelete(posts.id)}}>
                                            Edit
                                        </button> */}
                        {/* <button className="comment-edit" onClick={() => showForm === false ? setShowForm(true) : setShowForm(false) }>
                            Edit
                        </button>
                        {showForm && ( <EditPost id={posts.id}/>)} */}

                    </div>
                    {/* <div className="post-info">
                        Votes: {posts?.votes}
                    </div> */}
                </div>
            </div>
        </div>
        <form className="CommentForm" onSubmit={handleSubmit}>
            <label className="noteForms">
            <textarea
                    id='comment'
                    type="textarea"
                    // value={comment?.content}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    // placeholder={comment?.content}
            >{comment?.content}</textarea>
            </label>
            <button id="submit" type="submit">Submit</button>
        </form>
    </div>
    )
}

export default EditForm;
