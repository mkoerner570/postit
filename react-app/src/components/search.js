import React, {useState,useEffect} from "react";
import { GetAllPosts,GetSearchPost } from "../store/posts";
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";


function Search(){
    const [searchTitle,setSearchTitle] = useState('')
    const dispatch = useDispatch()
    const post = useSelector((state) => Object.values(state.posts));
    const history = useHistory()

    console.log("singlePost",post)

    const searchHandler = (e) => {
        setSearchTitle(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        let posts = Object.values(post)
        // const search = await dispatch(GetSearchPost(searchTitle))

        console.log("the search....",post)
        for( let i = 0; i<posts.length; i++ ){
            if(searchTitle === posts[i].title){
                history.push(`/post/${post[i].id}`)
            }
        }
        // history.push(`/post/${post.id}`)
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
                    <i class="fa fa-search">Search</i>
                </button>
            </form>
        </div>

    )
}

export default Search
