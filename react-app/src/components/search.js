import React, {useState,useEffect} from "react";
import { GetAllPosts } from "../store/posts";
import { GetSearchPost } from "../store/search";
import { useDispatch } from "react-redux"
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";


function Search({posts}){
    const [searchTitle,setSearchTitle] = useState([])
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    // const post = useSelector((state) => state.search.searchPost);
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
        console.log(searchTitle.length)
    }

    let errors = []
    const submitHandler = async (e) => {
        e.preventDefault()
        let item = dispatch(GetSearchPost(searchTitle))
        console.log(item)
        // if(post){
        //     setSearchTitle("")
        //     history.push(`/post/${post.id}`)
        // }
        // else{
        //     setSearchTitle("")
        //     history.push('/noresults')
        // }
        // const search = await dispatch(GetSearchPost(searchTitle))

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
        // if(!item){
        //     history.push('/noresults')
        // }
    }




    return (
        <div className="search-container">
            <div>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>
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
