import { csrfFetch } from "./csrf.js";

const POST_COMMENT = "session/PostComments"
const PUT_COMMENT = "session/PutComments";
const GET_COMMENTS = "session/GetComments";
// const GET_A_COMMENT = "session/GetAComment"
const DELETE_COMMENT = "session/DeleteComments";
const PLUS_COMMENT = 'session/PlusVoteComment'
const MINUS_COMMENT = 'session/MinusVoteComment'

const GetComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

// const GetAComment = (comment) => {
//   return {
//     type:GET_A_COMMENT,
//     payload: comment,
//   };
// };

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

const DeleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id
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
    console.log("store id", id)
    const actualId = parseInt(id.id)
    const response = await fetch(`/api/${actualId}/comment/edit`, {
      method:"PUT",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const  UpdatedComment  = await response.json();
      dispatch(UpdateComment(UpdatedComment));
    }
}

export const AddAComment = (form,id) => async (dispatch) => {
    const formData = new FormData()
    formData.append('content', form.content)
    formData.append("post_id",id)

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
    const int = id.id;
    const response = await fetch(`/api/posts/${id}/comments`);

    if (response.ok) {
      const comments = await response.json();
      dispatch(GetComments(comments));
    }
};

// export const GetOneComment = (id) => async (dispatch) =>{
//   console.log("the singlecomment ID", id)
//   const response = await fetch(`/api/comments/${id}/single`);

//   if (response.ok) {
//     const comment = await response.json();
//     dispatch(GetAComment(comment));
//   }
// }

export const DeleteAComment = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/delete/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(DeleteComment(id));
    }
};


export const initialState = {  };
const CommentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = Object.assign({}, state);
      action.comments.allComments.forEach( comment => newState[comment.id] = comment)
      return newState;
    // case GET_A_COMMENT:
    //   newState = Object.assign({}, state);
    //   newState.singleComment = action.payload.singleComment;
    //   return newState;
    case DELETE_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.id]
      return newState;
    case PUT_COMMENT:
    newState = Object.assign({}, state);
    newState[action.comment.id] = action.comment;
    return newState;
    case POST_COMMENT:
      newState = Object.assign({},state)
      newState[action.comment.id] = action.comment
      return newState
    // case PLUS_COMMENT:
    //     return {
    //           ...state, comments: state.comments.map(comment => {
    //               if (action.payload === comment.id)
    //                   return { ...comment, votes: ++comment.votes }
    //               else return { ...comment }
    //           })
    //       }
    // case MINUS_COMMENT:
    //   return {
    //           ...state, comments: state.comments.map(comment => {
    //               if (action.payload === comment.id)
    //                   return { ...comment, votes: --comment.votes }
    //               else return { ...comment }
    //           })
    //       }
    default:
      return state;
  }
};
export default CommentReducer;
