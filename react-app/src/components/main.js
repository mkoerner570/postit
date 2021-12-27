import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { GetAllPosts } from "../store/posts";
import { useHistory } from "react-router";
import Search from "./search";


function Main(){
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => Object.values(state.posts));
    const dispatch = useDispatch()

    console.log("+++++++++", posts)

    useEffect(() => {
        dispatch(GetAllPosts());
    }, [dispatch]);

    return(
        <div>
            <div>
                {
                    posts?.map(post =>{
                        return <div className="postContainer">
                            <div className="votes">
                                <div className="plusOne">
                                    <i class="fa fa-angle-up"></i>
                                </div>
                                <div className="minusOne">
                                    <i class="fa fa-angle-down"></i>
                                </div>
                            </div>

                            <div>
                                <div>{post.title}</div>
                                <div className="info">
                                    Posted By:
                                <span>{post.username}</span> on sub: <span >/r/{post.sub_id}</span>
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
