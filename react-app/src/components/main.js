import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { GetAllPosts } from "../store/posts";
import {GetAllSubs} from "../store/subs"
import { useHistory } from "react-router";
import Search from "./search";
import {NavLink} from "react-router-dom"
import { PlusVotePost,MinusVotePost,PlusVoteOnePost,MinusVoteOnePost } from "../store/posts"


function Main(){
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => Object.values(state.posts));
    const users = useSelector((state) => state)
    const subs = useSelector((state) => state.subs);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(GetAllSubs());
    }, [dispatch]);

    const PlusPostHandler = (post_id,sessionUser) => {
        if (sessionUser) {
            dispatch(PlusVoteOnePost(post_id))}
        else
            history.push(`/login`)
    }

    const MinusPostHandler = (post_id,sessionUser) => {
        if (sessionUser) {
            console.log(dispatch(MinusVoteOnePost(post_id)))
        }
        else
            history.push(`/login`)
    }


    return(
        <div>
            <div>
                {
                    posts?.map(post =>{
                        {console.log(post.id)}
                        return <div className="postContainer">
                            <div className="votes">
                                <button className="plusOne"onClick={() => {PlusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-up">up</i>
                                </button>
                                <button className="minusOne"onClick={() => {MinusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-down">down</i>
                                </button>
                            </div>

                            <div>
                                <NavLink to={`/post/${post.id}`}>{post.title}</NavLink>
                                <div>
                                    <image src={post.body}></image>
                                </div>
                                <div className="info">
                                    Posted By:
                                <span >/r/{
                                post.sub_id
                                }</span>
                                </div>
                                <div className="info">{post.votes}
                                    {localStorage.user_id == post.user_id ?
                                        <span>
                                            &nbsp;&nbsp;delete
                                              </span> : null
                                    }
                                </div>
                            </div>


                        </div>
                    })
                }
            </div>
            <div className="topBar">
                <Search />
            </div>
        </div>

    )
}

export default Main;
