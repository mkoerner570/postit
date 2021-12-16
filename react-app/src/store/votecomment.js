import { initialState } from "./comments"

const PlUS_COMMENT = 'session/PlusVoteComment'
const MINUS_COMMENT = 'session/MinusVoteComment'

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


const CommentVoteReducer = (state = initialState, action) => {
    switch(action.type){
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
    }
}
export default CommentVoteReducer;
