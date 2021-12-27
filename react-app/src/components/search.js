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

    const submitHandler = async (e) => {
        e.preventDefault()

        const search = await dispatch(searchPosts(searchTitle))
        history.push(`/post/${search.post_id}`)
    }

    return (
        <div className="search-container">
            <form >
                <input
                    type="text"
                    name="searchString"
                    value={searchTitle}
                    placeholder="Search Posts"
                    onChange={searchHandler}
                />
                <button onClick={submitHandler} className="search-button">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>

    )
}

export default Search
