import { csrfFetch } from "./csrf.js";

const GET_POSTS = 'session/GetPosts'
const GET_A_POST = 'session/GetAPost'
const POST_A_POST = 'session/PostPost'
const EDIT_POST = 'session/EditPost'
const DELETE_POST = 'session/DeletePost'
const PLUS_VOTE_POST = 'session/PlusVotePost'
const MINUS_VOTE_POST = 'session/MinusVotePost'
const PLUS_VOTE_ONE_POST = 'session/PlusVoteOnePost'
const MINUS_VOTE_ONE_POST = 'session/MinusVoteOnePost'
const SEARCH_POSTS = 'session/SearchPosts'

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

export const GetOnePost = (id) => async (dispatch) =>{
    const response = await fetch(`/api/posts/${id}/one`);

    if (response.ok) {
      const post = await response.json();
      dispatch(GetAPost(post));
    }
}

export const AddAPost = (form, body, sub) => async (dispatch) => {

    const formData = new FormData()
    const sub_id = parseInt(sub)
    console.log("the sub", sub_id)
    formData.append("body", body)
    formData.append('title', form.title)
    formData.append('sub_id', sub_id)
    console.log("the form data,",formData)
    const response = await fetch(`/api/add`, {
        method: "POST",
        body: formData,
    });
    // console.log("the response",response)
    if (response.ok) {
      const post = await response.json()
      dispatch(PostPost(post))
    }
}

export const EditAPost = (input, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const NewPost = await response.json();
      console.log()
      dispatch(EditPost(NewPost));
    }
};

export const DeleteAPost = (id) => async (dispatch) => {
    console.log("the delete,", id)
    let newID = parseInt(id)
    console.log(newID)
    const response = await fetch(`/api/destroy/${newID}`, {
      method: "DELETE",
    });
    console.log("the response",response)
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

export const searchPosts = (string) => {
  return {
      type: SEARCH_POSTS,
      payload: string
  }
}

export const GetSearchPost = (str) => async (dispatch) =>{
  const response = await fetch(`/api/posts/${str}/search`);

  if (response.ok) {
    const post = await response.json();
    dispatch(searchPosts(post));
  }
}

// export const initialState = { posts: [],singlePost:[] };
export const initialState = {};
const PostReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = Object.assign({}, state);
      // newState.posts = action.payload.post;
      // return newState;
      Object.values(action.payload.post).forEach(obj => {
        newState[obj.id] = obj;
      })
      // console.log("+++++++",newState)
      return newState;
    case GET_A_POST:
      newState = Object.assign({}, state);
      newState.singlePost = action.payload.singlePost;
      return newState;
    case DELETE_POST:
      newState = Object.assign({}, state);
      delete newState[action.id];
      delete newState.singlePost
      return newState;
    case POST_A_POST:
      newState={...state}
      newState[action.data.id] = action.data.id
      // const PostList = newState.posts.map(post => newState[post])
      // PostList.push(action.posts)
      return newState;
    case EDIT_POST:
      console.log("+++++++",action)
      newState = Object.assign({},state)
      newState[action.post.id] = action.post
      return newState
    //   case PLUS_VOTE_POST:
    //     return {
    //         ...state,
    //         posts: state.posts.map(post => {
    //             if (action.payload === post.id)
    //                 return { ...post, votes: ++post.votes }
    //             else return { ...post }
    //         })
    //     }
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
    // case SEARCH_POSTS:
    //   console.log("the store")
    //     return {
    //       ...state, posts: state.posts.filter(post => {
    //         console.log("the store",post)
    //           if (post.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1)
    //           console.log("the store",post)

    //           return state
    //       })
    //     }
    default:
      return state;
  }
};
export default PostReducer;
