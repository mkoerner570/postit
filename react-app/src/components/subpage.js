import React, {useState,useEffect} from "react";
import { useHistory,useParams } from "react-router";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import SubsBar from './subsbar';
import {GetTheUsers} from "../store/session"
import { GetAllPosts } from "../store/posts";
import {GetAllSubs} from "../store/subs"
import {NavLink} from "react-router-dom"


function Sub() {
    const {id} = useParams()
    const history = useHistory()
    const [sub,setSub] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => Object.values(state.posts));

    useEffect(() => {
        dispatch(GetAllPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(GetAllSubs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(GetTheUsers());
    }, [dispatch]);

    let subposts = []
    for(let i = 0; i < posts.length; i++){
        if(posts[i].sub_id === parseInt(id)){
            subposts.unshift(posts[i])
        }
    }

    return (
        <div>
            <SubsBar/>
            <div className="posts" >
                {
                    subposts?.map(post =>{
                        return <div className="postContainer">
                            {/* <div className="votes">
                                <button className="plusOne"onClick={() => {PlusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-up">up</i>
                                </button>
                                <button className="minusOne"onClick={() => {MinusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-down">down</i>
                                </button>
                            </div> */}

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
        </div>
        // <div className="subPage-container">
        //     <div className="subPage">

        //         <div>
        //             {!subs.length ? <div>No such sub</div> : null}
        //         </div>
        //         <div>r/{id}</div>
        //         <div>
        //             {
        //                 posts.length ?
        //                     posts.map(post => {
        //                         return <div className="post" >
        //                             <div className="like-container">
        //                                 <div className="upvote" onClick={() => { upVoteHandler(post.id) }}>
        //                                     <i class="fa fa-angle-up"></i>
        //                                 </div>
        //                                 <div className="downvote" onClick={() => { downVoteHandler(post.id, post.likes) }}>
        //                                     <i class="fa fa-angle-down"></i>
        //                                 </div>
        //                             </div>

        //                             <div>
        //                                 <div onClick={() => postLinkHandler(post.id)} style={{ color: "#0000FF", cursor: "pointer" }} >{post.title} </div>
        //                                 <div className="post-info">
        //                                     Posted By:
        //                                 <span>{post.username}</span> on sub:
        //                                 <span onClick={() => subLinkHandler(post.name)} style={styleColor}>
        //                                         /r/{post.name}
        //                                     </span>
        //                                 </div>
        //                                 <div className="post-info">Likes: {post.likes} </div>
        //                             </div>
        //                         </div>
        //                     }) : null
        //             }
        //         </div>
        //     </div>
        // </div>

    )
}

export default Sub
