import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import CommentForm from "./commentform";
import { GetOnePost, PlusVoteOnePost, DeleteAPost } from "../store/posts";
import {PlusPostHandler, MinusPostHandler } from "../utils/utilities"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditPost  from "./editpost"

function GetPost(){
    const Id = useParams()
    // const [postId,setPostId] = useState(post_id);
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.singlePost);
    // console.log(sessionUser)
    const [showForm,setShowForm] = useState(false)
    // console.log("this is the id", Id)
    // console.log("the single post",posts)

    useEffect(()=>{
        dispatch(GetOnePost(parseInt(Id.id)))
    },[dispatch])

    const handleDelete =async (e)=> {
        // e.preventDefault();
        // console.log("delete")
        await dispatch(DeleteAPost(Id.id))
        history.push(`/`)
    }
    let userCheck;
    if (sessionUser.id === posts?.user_id) {
      userCheck = <EditPost id={posts?.id} />;
    }

    // console.log("this is the post", posts)
    return(

        <div className="postPage-container">

        <div className="post">
            <div className="details">
                <div className="Post-V">
                    <div className="votes">
                        <div className="plusOne" onClick={() => {PlusPostHandler(Id)}}>
                            <i class="fa fa-angle-up"></i>
                        </div>
                        <div className="minusOne" onClick={() => {MinusPostHandler(Id)}}>
                            <i class="fa fa-angle-down"></i>
                        </div>
                    </div>

                </div>
                    <div>{posts?.title} </div>
                </div>

                <div>
                    <div className="post-body"> </div>
                    <img alt="" src={posts.body}/>
                    <div className="post-info">
                        Posted By: {posts.user_id} on subreadit:
                        <span style={{ color: "#007BFD", cursor: "pointer" }}>
                            <Link to={`/r/${posts?.sub_id}`}>
                                /r/{posts?.sub_id}
                            </Link>
                        </span>
                            {sessionUser.id === posts?.id}
                                        <button onClick={()=>{handleDelete(posts.id)}}>
                                            delete
                                              </button>

                        {sessionUser.id === posts?.user_id}
                                        {/* <button onClick={()=>{handleDelete(posts.id)}}>
                                            Edit
                                        </button> */}
                        <button onClick={() => showForm === false ? setShowForm(true) : setShowForm(false) }>
                            Edit
                        </button>
                        {showForm && ( <EditPost id={posts.id}/>)}


                    </div>
                    <div className="post-info">
                        Votes: {posts?.votes}
                    </div>
                </div>
            </div>
            <CommentForm id={posts.id}/>
        </div>
    )
}

export default GetPost;
