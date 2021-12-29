import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {EditAPost} from "../store/posts"


function EditPost({Id}){
    const id = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState("")

    console.log("edit id....",id)


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { title }
        dispatch(EditAPost(payload, parseInt(id.id)))
        console.log("handle submit",id)

        history.push(`/post/${id.id}`);
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
                    placeholder="Title"
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
