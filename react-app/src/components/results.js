import SubsBar from "./subsbar"
import { useLocation } from "react-router-dom"
import { NavLink } from "react-router-dom"
function Results(){
    const location = useLocation()
    const results = location.state.results
    return(
        <div>
            <SubsBar/>
            <h1> Showing Results</h1>

            <h3> Showing {results.length} results</h3>

            {
            results?.map(post =>{
                        return <div className="postContainer">

                            {/* <div className="votes">
                                <button className="plusOne"onClick={() => {PlusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-up">up</i>
                                </button>
                                <button className="minusOne"onClick={() => {MinusPostHandler(post.id,sessionUser)}}>
                                    <i class="fa fa-angle-down">down</i>
                                </button>
                            </div> */}

                            <div>
                                <div>
                                <NavLink className="title" to={`/post/${post.id}`}>
                                    {post.title}
                                        <img className="the-photos" alt="" src={post.body}/>
                                </NavLink>
                                </div>
                                {/* <div className="info">
                                    Posted By:{post.user_id}
                                <span >/r/{
                                post.sub_id
                                }</span>
                                </div> */}
                                {/* <div className="info">{post.votes} */}
                                    {/* {localStorage.user_id == post.user_id ?
                                        <button onClick={()=>{handleDelete(post.id)}}>
                                            delete
                                              </button> : null
                                    } */}
                                {/* </div> */}
                            </div>


                        </div>
                    })
                }

        </div>
    )
}
export default Results
