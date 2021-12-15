import { csrfFetch } from "./csrf.js";

const GET_POSTS = 'session/GetPosts'
const GET_A_POST = 'session/GetAPost'
const POST_A_POST = 'session/PostPost'
const EDIT_POST = 'session/EditPost'
const DELETE_POST = 'session/DeletePost'

const GetPosts = (data) => {
    return {
      type: GET_POSTS,
      payload: data,
    };
};

const GetAPost = (post) => {
    return {
      type:GET_A_POST,
      payload: post,
    };
};


const PostPost = (data) => {
    return {
      type:POST_A_POST,
      data,
    }
}

const EditPost = (post) => {
    return {
      type: EDIT_POST,
      post,
    };
};

const DeletePost = () => {
    return {
      type: DELETE_POST,
    };
};




const initialState = { posts: [],singlePost:[] };
const PostReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = Object.assign({}, state);
      newState.posts = action.payload.posts;
      return newState;
      case GET_A_POST:
      newState = Object.assign({}, state);
      newState.singlePost = action.payload.singlePost;
      return newState;
    case DELETE_POST:
      newState = Object.assign({}, state);
      delete newState[action.posts];
      return newState;
    case POST_A_POST:
      newState={...state}
      const PostList = newState.posts.map(post => newState[post])
      songList.push(action.posts)
      return newState;
    default:
      return state;
  }
};
export default PostReducer;
