import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import CommentForm from "./commentform";
import { PlusVoteOnePost, DeleteAPost, GetAllPosts, PlusPost, MinusPost } from "../store/posts";
import {GetOnePost} from "../store/single"
// import {PlusPostHandler, MinusPostHandler } from "../utils/utilities"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClearPost } from "../store/search";
import EditPost  from "./editpost"
import SubsBar from "./subsbar";

function GetPost(){
    const Id = useParams()
    // const [postId,setPostId] = useState(post_id);
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.single.singlePost);
    const [showForm,setShowForm] = useState(false)

    useEffect(async () => {
       await dispatch(GetAllPosts());
    }, [dispatch]);

    useEffect(async ()=>{
        await dispatch(GetOnePost(parseInt(Id.id)))
    },[dispatch])

    useEffect(async ()=>{
        await dispatch(ClearPost(parseInt(Id.id)))
    },[dispatch])

    if(!posts){
        return null
    }

    const PlusPostHandler = (post_id,sessionUser) => {
        if (sessionUser) {
            dispatch(PlusPost(post_id))}
        else
            history.push(`/login`)
    }

    const MinusPostHandler = (post_id,sessionUser) => {
        if (sessionUser) {
            dispatch(MinusPost(post_id))
        }
        else
            history.push(`/login`)
    }


    const handleDelete =async (e)=> {
        // e.preventDefault();
        if(posts.user_id === sessionUser.id){
            await dispatch(DeleteAPost(Id.id))
            history.push(`/`)
        }
        // await dispatch(DeleteAPost(Id.id))
        // history.push(`/`)
    }
    let userCheck;
    if(!sessionUser){
        history.push('/login')
    } else {
        if (sessionUser.id === posts?.user_id) {
      userCheck =
    <div>
        <button className="comment-submit" onClick={()=>{handleDelete(posts.id)}}>
            Delete
        </button>
        <button className="comment-submit" onClick={() => showForm === false ? setShowForm(true) : setShowForm(false) }>
            Edit
        </button>
        {showForm && ( <EditPost id={posts.id} form={showForm}/>)}
    </div>
        }

    }

    if(!posts){
        return null
    }

    return(

        <div className="postPage-container">
        <SubsBar/>
        <div className="the-post">
            <div className="details">
                <div className="Post-V">
                    <div className="votes">
                        <button className="plusOne" onClick={() => {PlusPostHandler(Id)}}>
                            <i class="fa fa-angle-up">Up</i>
                        </button>
                        {posts?.votes}
                        <button className="minusOne" onClick={() => {MinusPostHandler(Id)}}>
                            <i class="fa fa-angle-down">Down</i>
                        </button>
                    </div>

                </div>
                    <div className="post-title">{posts?.title} </div>
                </div>

                <div>
                    <img className="post-body" alt="" src={posts.body}/>
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
                        {userCheck}

                    </div>
                    {/* <div className="post-info">
                        Votes: {posts?.votes}
                    </div> */}
                </div>
            </div>
            <CommentForm id={posts.id}/>
        </div>
    )
}

export default GetPost;
