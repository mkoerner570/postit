import React, {useState,useEffect} from "react";
import { GetAllPosts } from "../store/posts";
import { GetSearchPost } from "../store/search";
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";


function Search(){
    const [searchTitle,setSearchTitle] = useState('')
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const post = useSelector((state) => state.search.searchPost);
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
        await dispatch(GetSearchPost(searchTitle))
        console.log(searchTitle)
        console.log(post)
        // const search = await dispatch(GetSearchPost(searchTitle))
        // console.log(search === true)

        // for( let i = 0; i<posts.length; i++ ){
        //     if(searchTitle === posts[i].title.toLowerCase()){
        //         setSearchTitle("")
        //         history.push(`/post/${post[i].id}`)
        //     }
        //     else{
        //         setSearchTitle("")
        //         history.push('/noresults')
        //     }
        // }
        // history.push(`/post/${post.id}`)
    }

    // console.log("+++++++",post)

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
