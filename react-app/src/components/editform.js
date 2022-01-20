import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UpdateAComment} from "../store/comments"
import { GetOneComment } from "../store/comments"

function EditForm({id}){
    const dispatch = useDispatch();
    const history = useHistory();
    const ids = useParams();
    const comment = useSelector((state) =>state.comments.singleComment)
    const [content, setContent] = useState("")
    console.log("post ID________",ids)
    console.log("++++",comment)
    console.log(id)

    useEffect( async() => {
        await dispatch(GetOneComment(id))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { content}
        dispatch(UpdateAComment(payload, id))


        history.push(`/post/${ids.id}`);
    }

    return (
        <form className="CommentForm" onSubmit={handleSubmit}>
            <label className="noteForms">
            <textarea
                    id='comment'
                    type="textarea"
                    // value={comment.content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Your New Comment here"
            />
            </label>
            <button id="submit" type="submit">Submit</button>
        </form>
    )
}

export default EditForm;
