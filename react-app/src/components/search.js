import React, {useState,useEffect} from "react";
import { GetAllPosts,GetSearchPost } from "../store/posts";
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";


function Search(){
    const [searchTitle,setSearchTitle] = useState('')
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const post = useSelector((state) => Object.values(state.posts));
    const history = useHistory()

    useEffect(async () => {
        await dispatch(GetAllPosts());
    }, [dispatch]);

    const searchHandler = (e) => {
        setSearchTitle(e.target.value)
    }

    let errors = []
    const submitHandler = async (e) => {
        e.preventDefault()
        let posts = Object.values(post)
        // const search = await dispatch(GetSearchPost(searchTitle))

        for( let i = 0; i<posts.length; i++ ){
            if(searchTitle === posts[i].title.toLowerCase()){
                history.push(`/post/${post[i].id}`)
            }
            else{
                errors.push("Sorry, your title is not correct. Please make sure your spelling is correct")
            }
        }
        // history.push(`/post/${post.id}`)
    }

    return (
        <div className="search-container">
            <form >
            <div>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>
                <input
                    type="text"
                    name="searchString"
                    value={searchTitle}
                    placeholder="Search Posts"
                    onChange={searchHandler}
                    required={true}
                    className="input"
                />
                <button onClick={submitHandler} className="search-button">
                    <i class="fa fa-search">Search</i>
                </button>
            </form>
        </div>

    )
}

export default Search
