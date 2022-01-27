import React, {useState,useEffect} from "react";
import { GetAllPosts } from "../store/posts";
import { GetSearchPost } from "../store/search";
import { useDispatch } from "react-redux"
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";


function Search({posts}){
    const [searchTitle,setSearchTitle] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const allPosts = Object.values(posts)

    useEffect(async () => {
        await dispatch(GetAllPosts());
    }, [dispatch]);

    const searchHandler = (e) => {
        const search = e.target.value;
        const searchedFor = allPosts.filter((data) => {
            return data.title.includes(search.toLowerCase())
        })
        if(search === ""){
            setSearchTitle([])
        } else {
            setSearchTitle(searchedFor)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if(searchTitle.length === 0){
            history.push('/noresults')
        } else {
            history.push({
                pathname:'/results',
                state:{results:searchTitle}})
                setSearchTitle("")
        }
    }




    return (
        <div className="search-container">
                <input
                    type="text"
                    name="searchString"
                    placeholder="Search Posts"
                    onChange={searchHandler}
                    required={true}
                    className="input"
                />
                <button onClick={submitHandler} className="search-button">
                    <i class="fa fa-search">Search</i>
                </button>
                {searchTitle.length > 0 && (
                    <div className="results">
                        {searchTitle.map((post) => {
                            return(
                                <ul>
                                <NavLink className="search-title" to={`/post/${post.id}`}>
                                    <img className="search-photo" alt="" src={post.body}/>
                                    {post.title}
                                </NavLink>
                                </ul>
                            )
                        })}
                    </div>
                )}
        </div>

    )
}

export default Search
