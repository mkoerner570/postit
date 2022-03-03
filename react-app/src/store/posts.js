import { csrfFetch } from "./csrf.js";

const GET_POSTS = 'session/GetPosts'
const POST_A_POST = 'session/PostPost'
const EDIT_POST = 'session/EditPost'
const DELETE_POST = 'session/DeletePost'
const PLUS_VOTE_POST = 'session/PlusVotePost'
const MINUS_VOTE_POST = 'session/MinusVotePost'
const PLUS_VOTE_ONE_POST = 'session/PlusVoteOnePost'
const MINUS_VOTE_ONE_POST = 'session/MinusVoteOnePost'
const PUT_A_POST = 'session/PutAPost'

const GetPosts = (data) => {
    return {
      type: GET_POSTS,
      payload: data,
    };
};

const PostPost = (data) => {
    return {
      type:POST_A_POST,
      data,
    }
}

const PutAPost = (data) => {
  return{
    type: PUT_A_POST,
    data,
  }
}

const EditPost = (data) => {
    return {
      type: EDIT_POST,
      data,
    };
};

const DeletePost = (id) => {
    return {
      type: DELETE_POST,
      id
    };
};

export const GetAllPosts = () => async (dispatch) => {
    const response = await csrfFetch(`/api/posts`);
    if (response.ok) {
      const data = await response.json();
      dispatch(GetPosts(data));
    }
};

export const AddAPost = (form, body, sub) => async (dispatch) => {
    const formData = new FormData()
    const sub_id = parseInt(sub)
    formData.append("body", body)
    formData.append('title', form.title)
    formData.append('sub_id', sub_id)
    const response = await fetch(`/api/add`, {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
      const post = await response.json()
      dispatch(PostPost(post))
    }
}

export const EditAPost = (title, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/${id}/post/edit`, {
      method: "PUT",
      body: JSON.stringify(title),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const NewPost = await response.json();
      dispatch(EditPost(NewPost));
    }
};

export const PutPost = (title,id) => async (dispatch) => {
  const response = await csrfFetch(`/api/${id}/post/edit`, {
    method: "PUT",
    body: JSON.stringify(title),
    headers: { "Content-Type": "application/json" },
  });
  if(response.ok){
    const EditedPost = await response.json();
    dispatch(PutAPost(EditedPost))
  }
}

export const DeleteAPost = (id) => async (dispatch) => {
    let newID = parseInt(id)
    const response = await fetch(`/api/destroy/${newID}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(DeletePost(newID));
    }
};

export const PlusVotePost = (id) => {
  return {
      type: PLUS_VOTE_POST,
      payload: id
  }
}

export const MinusVotePost = (id) => {
  return {
      type: MINUS_VOTE_POST,
      payload: id
  }
}

export const PlusVoteOnePost = (id) => {
  return {
      type: PLUS_VOTE_ONE_POST,
      payload: id
  }
}

export const MinusVoteOnePost = (id) => {
  return {
      type: MINUS_VOTE_ONE_POST,
      payload: id
  }
}

export const PlusPost = (id) => async (dispatch) => {
  console.log(typeof id )
  const response = await csrfFetch(`/api/postplus/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if(response.ok){
    const VotedPost = await response.json();
    dispatch(PlusVoteOnePost(VotedPost))
  }
}

export const initialState = {};
const PostReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = Object.assign({}, state);
      Object.values(action.payload.post).forEach(obj => {
        newState[obj.id] = obj;
      })
      return newState;
    case DELETE_POST:
      newState = Object.assign({}, state);
      delete newState[action.id];
      delete newState.singlePost
      return newState;
    case POST_A_POST:
      newState={...state}
      newState[action.data.id] = action.data.id
      return newState;
    case EDIT_POST:
      newState = Object.assign({},state)
      newState[action.data.id] = action.data
      return newState
    case PUT_A_POST:
      newState = Object.assign({},state)
      newState[action.data.id] = action.data
      return newState
    case PLUS_VOTE_POST:
      return {
            ...state,
            posts: state.posts.map(post => {
                if (action.payload === post.id)
                    return { ...post, votes: ++post.votes }
                else return { ...post }
            })
        }
    // case MINUS_VOTE_POST:
    //     return {
    //         ...state,
    //         posts: state.posts.map(post => {
    //             if (action.payload === post.id)
    //                 return { ...post, votes: --post.votes }
    //             else return { ...post }
    //         })
    //     }
    // case PLUS_VOTE_ONE_POST:
    //     return {
    //         ...state, post: { ...state.post, votes: ++state.post.votes }
    //     }
    // case MINUS_VOTE_ONE_POST:
    //     return {
    //         ...state, post: { ...state.post, votes: --state.post.votes }
    //     }
    default:
      return state;
  }
};
export default PostReducer;
