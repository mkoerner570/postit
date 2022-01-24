import { csrfFetch } from "./csrf.js";

const SEARCH_POSTS = 'session/SearchPosts'

export const searchPosts = (string) => {
    return {
        type: SEARCH_POSTS,
        payload: string
    }
}

export const GetSearchPost = (title) => async (dispatch) =>{
    const response = await fetch(`/api/posts/search/${title}`);

    if (response.ok) {
      const post = await response.json();
      dispatch(searchPosts(post));
    }
}

export const initialState = {};
const SearcReducer = (state = initialState, action) =>{
    let newState;
    switch (action.type){
        case SEARCH_POSTS:
            newState = Object.assign({},state);
            newState.searchPost = action.payload.searchPost;
            return newState;
        default:
            return state;
    }
}
export default SearcReducer
