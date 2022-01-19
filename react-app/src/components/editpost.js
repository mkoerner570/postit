import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {EditAPost} from "../store/posts"


function EditPost({Id}){
    const id = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector((state) => state.posts.singlePost);
    const [editedTitle,setEditedTitle] = useState(posts.title)


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { editedTitle }
        dispatch(EditAPost(payload, parseInt(id.id)))

        history.push(`/`);
    }

    return(
        <div className='upload'>
        <form className="PostForm" onSubmit={handleSubmit}>
            <div className='inner'>

            <label className="noteForms">
                <input
                    className='input'
                    id='title'
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    required
                /><br></br>
                </label>
                <button id="submit" type="submit" >Submit</button>
                </div>
                </form>
                </div>
            )

}
export default EditPost
