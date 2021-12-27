import { PlusVoteComment,MinusVoteComment,PlusVoteOneComment,MinusVoteOneComment } from "../store/comments"
import { PlusVotePost,MinusVotePost,PlusVoteOnePost,MinusVoteOnePost } from "../store/posts"
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

// const dispatch = useDispatch()

export const PlusPostHandler = (post_id,sessionUser) => {
    const history = useHistory()
    const dispatch = useDispatch()
    if (sessionUser) {
        dispatch(PlusVoteOnePost(post_id))}
    else
        history.push(`/login`)

}

export const MinusPostHandler = (post_id,sessionUser) => {
    const dispatch = useDispatch()
    const history = useHistory()
    if (sessionUser) {
        dispatch(MinusVoteOnePost(post_id))
    }
    else
        history.push(`/login`)
}

export const PlusCommentHandler = (post_id,sessionUser) => {
    const dispatch = useDispatch()
    const history = useHistory()
    if (sessionUser) {
        dispatch(PlusVoteComment(post_id))}
    else
        history.push(`/login`)

}

export const MinusCommentHandler = (post_id, post_likes,sessionUser) => {
    const dispatch = useDispatch()
    const history = useHistory()
    if (sessionUser) {
        dispatch(MinusVoteComment(post_id))
    }
    else
        history.push(`/login`)
}
