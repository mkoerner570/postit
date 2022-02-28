import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { GetAllPosts } from "../store/posts";
import {GetAllSubs} from "../store/subs"
import { useHistory,useParams } from "react-router";
import Search from "./search";
import {NavLink} from "react-router-dom"
// import { PlusVotePost,MinusVotePost,PlusVoteOnePost,MinusVoteOnePost } from "../store/posts"
import {DeleteAPost, PlusPost} from "../store/posts"
import {GetTheUsers} from "../store/session"
import SubsBar from './subsbar';

function Main(){
    const history = useHistory()
    const id = useParams()
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => Object.values(state.posts));
    const users = useSelector((state) => state.users)
    // const subs = useSelector((state) => state.subs);
    const allSubs = useSelector((state) => state.subs)
    const subs = Object.values(allSubs)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(GetAllSubs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(GetTheUsers());
    }, [dispatch]);


    const PlusPostHandler = (post_id,sessionUser) => {
        if (sessionUser) {
            dispatch(PlusPost(post_id))}
        else
            history.push(`/login`)
    }

    // const MinusPostHandler = (post_id,sessionUser) => {
    //     if (sessionUser) {
    //     }
    //     else
    //         history.push(`/login`)
    // }
    let allPosts = []
    for(let i = 0; i < posts.length; i++){
        allPosts.unshift(posts[i])
    }


    return(
        <div>
            <SubsBar/>
            {/* <div>
                {subs?.map( sub => {
                <div>
                <NavLink to={`/sub/${sub.id}`} exact={true} activeClassName='active' className='links'>{sub.name}</NavLink>
                <p>{sub.name}</p>
                </div>
            }
            )}
            </div> */}
            <div className="posts" >
                {
                    allPosts?.map(post =>{
                        return <div className="postContainer">
                            <div className="votes">
                                <button className="plusOne"onClick={() => {PlusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-up">up</i>
                                </button>
                                {/* <button className="minusOne"onClick={() => {MinusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-down">down</i>
                                </button> */}
                            </div>

                            <div>
                                <div>
                                <NavLink className="title" to={`/post/${post.id}`}>
                                    {post.title}
                                    {/* <img src={post.body}>Image</img> */}
                                        <img className="the-photos" alt="" src={post.body}/>
                                </NavLink>
                                </div>

                                    {/* <img alt="the image" src={post.body}>Image</img> */}

                                {/* <div className="info">
                                    Posted By:{post.user_id}
                                <span >/r/{
                                post.sub_id
                                }</span>
                                </div> */}
                                {/* <div className="info">{post.votes} */}
                                    {/* {localStorage.user_id == post.user_id ?
                                        <button onClick={()=>{handleDelete(post.id)}}>
                                            delete
                                              </button> : null
                                    } */}
                                {/* </div> */}
                            </div>


                        </div>
                    })
                }
            </div>
            {/* <div className="topBar">
                <Search />
            </div> */}
        </div>

    )
}

export default Main;
