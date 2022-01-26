import { csrfFetch } from "./csrf.js";

const SEARCH_POSTS = 'session/SearchPosts'
const CLEAR_POST = 'session/ClearPost'

export const SearchPosts = (string) => {
    return {
        type: SEARCH_POSTS,
        payload: string
    }
}

export const ClearPost = (id) => {
    return{
        type: CLEAR_POST,
        id
    }
}

export const GetSearchPost = (title) => async (dispatch) =>{
    const response = await fetch(`/api/posts/search/${title}`);

    if (response.ok) {
      const post = await response.json();
      dispatch(SearchPosts(post));
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
        case CLEAR_POST:
            newState = Object.assign({}, state);
            delete newState[action.id]
            delete newState.searchPost;
            return newState;
        default:
            return state;
    }
}
export default SearcReducer
