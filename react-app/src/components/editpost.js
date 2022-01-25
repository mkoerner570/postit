import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import EditAPost from "../store/posts";
import { PutPost } from "../store/posts";
import GetOnePost from "../store/single"
// import SubsBar from "./subsbar";


function EditPost({Id},form){
    const id = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector((state) => state.single.singlePost);
    const user = useSelector((state) => state.session.user.id)
    const [title,setTitle] = useState(posts.title)
    const [showForm,setShowForm] = useState(form)
    const ids = parseInt(id.id)


    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = { title }
        await dispatch(PutPost(payload, ids))
        // await dispatch(GetOnePost(parseInt(id.id)))
        // setShowForm = false
        history.push(`/users/${user}`);
    }


    return(
        <div className='upload'>
        {/* <SubsBar/> */}
        <form className="PostForm" onSubmit={handleSubmit}>
            <div className='inner'>

            <label className="noteForms">
                <input
                    className='post-input'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                /><br></br>
                </label>
                <button className='comment-submit' type="submit" onClick={() => showForm === true ? setShowForm(false) : setShowForm(true) }>Submit</button>
                </div>
                </form>
                </div>
            )

}
export default EditPost
