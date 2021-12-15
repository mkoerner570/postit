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

export const GetAllPosts = () => async (dispatch) => {
    const response = await csrfFetch(`/api/posts`);
    if (response.ok) {
      const data = await response.json();
      dispatch(GetPosts(data));
    }
};

export const GetOnePost = (id) => async (dispatch) =>{
    const response = await fetch(`/api/posts/${id}`);

    if (response.ok) {
      const post = await response.json();
      dispatch(GetAPost(post));
    }
}

export const AddAPost = (form, image) => async (dispatch) => {
    const formData = new FormData()
    formData.append("image", image)
    formData.append('title', form.title)
    const response = await fetch(`/api/add`, {
        method: "POST",
        body: formData
    });
    if (response.ok) {
      const songs = await response.json()
      dispatch(PostPost(songs))
    }
}

export const EditAPost = (input, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const { NewPost } = await response.json();
      dispatch(EditPost(NewPost));
    }
};

export const DeleteAPost = (id) => async (dispatch) => {
    const response = await fetch(`/api/destroy/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(DeletePost());
    }
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
