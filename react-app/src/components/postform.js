import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AddAPost } from "../store/posts";
import {GetAllSubs} from "../store/subs";



function PostForm({}){
    const dispatch = useDispatch()
    const [title,setTitle] = useState("");
    const [post, setPost] = useState();
    const [isPostPicked, setIsPostPicked] = useState(false);
    const [selectedSub, setSelectedSub] = useState(0)
    const subs = useSelector((state) => state.subs);
    const history = useHistory()

    const changeHandler = (event) => {
		setPost(event.target.files[0]);
        setIsPostPicked(true)
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = { title }
        await dispatch(AddAPost(payload, post, selectedSub))
        history.push(`/`)
    }

    useEffect(() => {
        dispatch(GetAllSubs());
    }, [dispatch]);



    return(
        <div className='upload'>
            <h1 className='upload-labs1'>What would you like to post?</h1>
        <form className="PostForm" onSubmit={handleSubmit}>
            <div className='inner'>

            <label className="noteForms">
                <input
                    className='input'
                    id='title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                /><br></br>
                <label className='upload-labs'> Select file you wish to Upload<br></br></label>
                <input type="file" name="image" onChange={changeHandler} />
			    {isPostPicked ? (
				    <p>Image selected</p>
			    ) : (
				    <p></p>
			    )}
                <select value={selectedSub} onChange={(e) => setSelectedSub(e.target.value)}>
                    {Object.keys(subs).map(function(keyname,keyindex) {
                        // console.log("...........",keyindex)
                        return(
                            <option value={keyindex}>
                                {subs[keyindex]}
                            </option>
                        )
                    })}
                </select>
                {/* <select value={selectedSub} onChange={setSelectedSub()}>
                    {Object.keys(subs).map(function(keyname,keyindex) {
                        return(
                            <option value={keyindex}>
                                {keyname}
                            </option>
                        )
                    })}
                </select> */}
            </label>
            <button id="submit" type="submit" >Submit</button>
            </div>
        </form>
        </div>
    )
}
export default PostForm
