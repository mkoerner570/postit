import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import EditAPost from "../store/posts";
import GetOnePost from "../store/single"


function EditPost({Id},form){
    const id = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector((state) => state.posts.singlePost);
    const [title,setTitle] = useState(posts.title)
    const [showForm,setShowForm] = useState(form)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { title }
        await dispatch(EditAPost(payload, parseInt(id.id)))
        await dispatch(GetOnePost(parseInt(id.id)))
        // setShowForm = false

        history.push(`/post/${parseInt(id.id)}`);
    }

    return(
        <div className='upload'>
        <form className="PostForm" onSubmit={handleSubmit}>
            <div className='inner'>

            <label className="noteForms">
                <input
                    className='input'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                /><br></br>
                </label>
                <button id="submit" type="submit" onClick={() => showForm === true ? setShowForm(false) : setShowForm(true) }>Submit</button>
                </div>
                </form>
                </div>
            )

}
export default EditPost
