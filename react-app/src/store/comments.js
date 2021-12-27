import { csrfFetch } from "./csrf.js";

const POST_COMMENT = "session/PostComments"
const PUT_COMMENT = "session/PutComments";
const GET_COMMENTS = "session/GetComments";
const DELETE_COMMENT = "session/DeleteComments";
const PLUS_COMMENT = 'session/PlusVoteComment'
const MINUS_COMMENT = 'session/MinusVoteComment'

const GetComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

const AddComments = (comment) => {
  return {
    type:POST_COMMENT,
    comment,
  }
}

const UpdateComment = (comment) => {
  return {
    type: PUT_COMMENT,
    comment,
  };
};

const DeleteComment = (comments) => {
  return {
    type: DELETE_COMMENT,
    comments
  };
};

export const PlusVoteComment = (id) => {
  return {
      type: PLUS_COMMENT,
      payload: id
  }
}


export const MinusVoteComment = (id) => {
  return {
      type: MINUS_COMMENT,
      payload: id
  }
}

export const UpdateAComment = (input, id) => async (dispatch) => {
    const response = await fetch(`/api/${id}/edit`, {
      method:"PUT",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const  UpdatedComment  = await response.json();
      dispatch(UpdateComment(UpdatedComment));
    }
}

export const AddAComment = (form) => async (dispatch) => {
    const formData = new FormData()
    formData.append('content', form.content)
    formData.append("post_id",form.postId)

    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const NewComment  = await response.json();
      dispatch(AddComments(NewComment));
    }
}

export const GetAllComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`);

    if (response.ok) {
      const comments = await response.json();
      dispatch(GetComments(comments));
    }
};

export const DeleteAComment = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/delete/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(DeleteComment(id));
    }
};


export const initialState = { comments: [] };
const CommentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = Object.assign({}, state);
      newState.comments = action.comments;
      return newState;
    case DELETE_COMMENT:
      newState = Object.assign({}, state);
      newState.comments = state.comments.filter(({ id }) => id !== action.comments);
      return newState;
    case PUT_COMMENT:
    newState = Object.assign({}, state);
    const index = state.comments.findIndex(c => c.id === action.comment.id);
    newState.comments = [...state.comments.slice(0, index), action.comment, ...state.comments.slice(index + 1)];
    return newState;
    case POST_COMMENT:
        return { ...state, comments: [...state.comments, action.comment] };
    case PLUS_COMMENT:
        return {
              ...state, comments: state.comments.map(comment => {
                  if (action.payload === comment.id)
                      return { ...comment, votes: ++comment.votes }
                  else return { ...comment }
              })
          }
    case MINUS_COMMENT:
      return {
              ...state, comments: state.comments.map(comment => {
                  if (action.payload === comment.id)
                      return { ...comment, votes: --comment.votes }
                  else return { ...comment }
              })
          }
    default:
      return state;
  }
};
export default CommentReducer;
