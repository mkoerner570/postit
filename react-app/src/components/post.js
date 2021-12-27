import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import CommentForm from "./commentform";
import { GetOnePost, PlusVoteOnePost } from "../store/posts";
import {PlusPostHandler, MinusPostHandler } from "../utils/utilities"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function GetPost(){
    const postId = useParams()
    // const [postId,setPostId] = useState(post_id);
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.posts);

    useEffect(()=>{
        dispatch(GetOnePost(postId))
    },[dispatch])


    return(
        <div className="postPage-container">

        <div className="post">
            <div className="details">
                <div className="Post-V">
                    <div className="votes">
                        <div className="plusOne" onClick={() => {PlusPostHandler(postId)}}>
                            <i class="fa fa-angle-up"></i>
                        </div>
                        <div className="minusOne" onClick={() => {MinusPostHandler(postId)}}>
                            <i class="fa fa-angle-down"></i>
                        </div>
                    </div>

                </div>
                    <div>{posts.title} </div>
                </div>

                <div>
                    <div className="post-body"> {posts.body} </div>
                    <div className="post-info">
                        Posted By: {posts.username} on subreadit:
                        <span style={{ color: "#007BFD", cursor: "pointer" }}>
                            <Link to={`/r/${posts.subreadit}`}>
                                /r/{posts.subreadit}
                            </Link>
                        </span>
                    </div>
                    <div className="post-info">
                        Votes: {posts.votes}
                    </div>
                </div>
            </div>
            <CommentForm />
        </div>
    )
}

export default GetPost;
