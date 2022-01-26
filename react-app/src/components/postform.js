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
    const [errors, setErrors] = useState([]);
    const [isPostPicked, setIsPostPicked] = useState(false);
    const [selectedSub, setSelectedSub] = useState(0)
    const allsubs = useSelector((state) => state.subs);
    const subs = Object.values(allsubs)
    const history = useHistory()

    const changeHandler = (event) => {
		setPost(event.target.files[0]);
        setIsPostPicked(true)
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = { title }
        await dispatch(AddAPost(payload, post, parseInt(selectedSub)))
        history.push(`/`)
    }

    useEffect(() => {
        dispatch(GetAllSubs());
    }, [dispatch]);




    return(
        <div className='upload'>
            <h1 className='upload-labs1'>What would you like to post?</h1>
        <form className="PostForm" onSubmit={handleSubmit}>
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='inner'>

            <label className="noteForms">
                <input
                    className='input'
                    id='title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required={true}
                /><br></br>
                <label className='upload-labs'> Select file you wish to Upload<br></br></label>
                <input type="file" name="image" onChange={changeHandler} required={true}/>
			    {isPostPicked ? (
				    <p>Image selected</p>
			    ) : (
				    <p></p>
			    )}
                <select value={selectedSub} onChange={(e) => setSelectedSub(e.target.value)} required={true}>
                    <option>Select a sub</option>
                    {Object.keys(subs).map(function(sub,keyname,keyindex){
                        return(
                            <option value={subs[keyname].id}>
                                {subs[keyname].name}
                            </option>
                        )
                    })}
                </select>
                {/* <select value={selectedSub} onChange={(e) => setSelectedSub(e.target.value)}required={true}>
                    {Object.keys(subs).map(function(keyname,keyindex) {
                        return(
                            <option value={keyindex}>
                                {subs[keyindex]}
                            </option>
                        )
                    })}
                </select> */}
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
