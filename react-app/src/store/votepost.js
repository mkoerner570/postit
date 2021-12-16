import { initialState } from "./posts"

const PLUS_VOTE_POST = 'session/PlusVotePost'
const MINUS_VOTE_POST = 'session/MinusVotePost'
const PLUS_VOTE_ONE_POST = 'session/PlusVoteOnePost'
const MINUS_VOTE_POST = 'session/MinusVoteOnePost'

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

const PostVoteReducer = (state = initialState, action => {
    switch(action.type){
        case PLUS_VOTE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (action.payload === post.id)
                        return { ...post, votes: ++post.votes }
                    else return { ...post }
                })
            }
        case MINUS_VOTE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (action.payload === post.id)
                        return { ...post, votes: --post.votes }
                    else return { ...post }
                })
            }
        case PLUS_VOTE_ONE_POST:
            return {
                ...state, post: { ...state.post, votes: ++state.post.votes }
            }
        case MINUS_VOTE_ONE_POST:
            return {
                ...state, post: { ...state.post, votes: --state.post.votes }
            }
    }
})
