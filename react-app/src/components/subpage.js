import React, {useState,useEffect} from "react";
import { useHistory,useParams } from "react-router";
import { useDispatch } from "react-redux"


function Sub() {
    const {id} = useParams()
    const history = useHistory()
    const [sub,setSub] = useState([])
    const [posts,setPosts] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        
    },[dispatch])

    return (
        <div className="subPage-container">
            <div className="subPage">

                <div>
                    {!subs.length ? <div>No such sub</div> : null}
                </div>
                <div>r/{id}</div>
                <div>
                    {
                        posts.length ?
                            posts.map(post => {
                                return <div className="post" >
                                    <div className="like-container">
                                        <div className="upvote" onClick={() => { upVoteHandler(post.id) }}>
                                            <i class="fa fa-angle-up"></i>
                                        </div>
                                        <div className="downvote" onClick={() => { downVoteHandler(post.id, post.likes) }}>
                                            <i class="fa fa-angle-down"></i>
                                        </div>
                                    </div>

                                    <div>
                                        <div onClick={() => postLinkHandler(post.id)} style={{ color: "#0000FF", cursor: "pointer" }} >{post.title} </div>
                                        <div className="post-info">
                                            Posted By:
                                        <span>{post.username}</span> on sub:
                                        <span onClick={() => subLinkHandler(post.name)} style={styleColor}>
                                                /r/{post.name}
                                            </span>
                                        </div>
                                        <div className="post-info">Likes: {post.likes} </div>
                                    </div>
                                </div>
                            }) : null
                    }
                </div>
            </div>
        </div>

    )
}

export default Sub
