import React, {useEffect, useState} from "react";
import { GetAllPosts } from "../store/posts";
import { useHistory } from "react-router";


function Main(){
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(GetAllPosts());
    }, [dispatch]);

    return(
        <div>
            <div>
                {
                    data.posts.map(post =>{
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
        </div>
    )
}

export default Main;
