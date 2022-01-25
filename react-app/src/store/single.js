import { csrfFetch } from "./csrf.js";

const GET_A_POST = 'session/GetAPost'
const GET_A_COMMENT = "session/GetAComment"

const GetAPost = (post) => {
    return {
      type:GET_A_POST,
      payload: post,
    };
};

const GetAComment = (comment) => {
    return {
      type:GET_A_COMMENT,
      payload: comment,
    };
};


export const GetOnePost = (id) => async (dispatch) =>{
    const response = await fetch(`/api/posts/${id}/one`);

    if (response.ok) {
      const post = await response.json();
      dispatch(GetAPost(post));
    }
}

export const GetOneComment = (id) => async (dispatch) =>{
    const response = await fetch(`/api/comments/${id}/single`);

    if (response.ok) {
      const comment = await response.json();
      dispatch(GetAComment(comment));
    }
}

export const initialState = {}
const SingleReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_A_POST:
            newState = Object.assign({}, state);
            newState.singlePost = action.payload.singlePost;
            return newState;
        case GET_A_COMMENT:
            newState = Object.assign({}, state);
            newState.singleComment = action.payload.singleComment;
      return newState;
        default:
            return state
    }
}
export default SingleReducer;
