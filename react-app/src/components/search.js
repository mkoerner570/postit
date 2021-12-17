import React, {useState,useEffect} from "react";
import { GetAllPosts,searchPosts } from "../store/posts";
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

function Search(){
    const [searchTitle,setSearchTitle] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    
    const searchHandler = (e) => {
        setSearchTitle(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        const search = dispatch(searchPosts(searchTitle))
        history.push(`/post/${search.post_id}`)

    }

    return (
        <div className="search-container">
            <form >
                <input
                    type="text"
                    name="searchString"
                    value={searchString}
                    placeholder="Search Posts"
                    onChange={changeHandler}
                />
                <button onClick={submitHandler} className="search-button">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>

    )
}

export default Search
