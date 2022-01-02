import React, { useState, useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { GetAllPosts,DeleteAPost } from "../store/posts";
import {GetAllComments} from "../store/comments"
import {NavLink} from "react-router-dom"
import EditPost  from "./editpost"

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const id = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));
  const comments = useSelector((state) => Object.values(state.comments));
  let currentId = parseInt(id.userId)
  const [showForm,setShowForm] = useState(false)


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    dispatch(GetAllPosts());
  }, [dispatch]);

  useEffect(()=>{
  dispatch(GetAllComments(currentId))
  },[dispatch])

  if (!user) {
    return null;
  }
  if(!posts){
    return null
  }
  if(!comments){
    return null
  }

  let user_posts = []
  for(let i = 0; i < posts.length; i++){
    if(posts[i].user_id === currentId){
      user_posts.push(posts[i])
    }
  }

  let user_comments = []
  for (let i = 0; i < comments.length; i++){
    if(comments[i].user_Id === currentId){
      user_comments.push(comments[i])
    }
  }
  // const handleDelete = async (e)=> {
  //   console.log("the delete",id)
  //   history.push(`/users/${currentId}`)
  // }

  let post_check;

  return (
    <div>

    <div className="user-posts">
      {user_posts?.map(post => {
        return <div className="postContainer">
          <div>
            <div>
              <NavLink className="title" to={`/post/${post.id}`}>
                {post.title}
                <img className="the-photos" alt="" src={post.body}/>
              </NavLink>
            </div>
            <button className="comment-delete" onClick={()=>{
              dispatch(DeleteAPost(post.id));
              history.push(`/users/${currentId}`)
            }}>
              Delete
            </button>
          </div>
        </div>
      })}
    </div>


    </div>
  );
}
export default User;
