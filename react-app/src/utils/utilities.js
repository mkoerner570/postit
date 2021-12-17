import { PlusVoteComment,MinusVoteComment,PlusVoteOneComment,MinusVoteOneComment } from "../store/comments"
import { PlusVotePost,MinusVotePost,PlusVoteOnePost,MinusVoteOnePost } from "../store/posts"
import { useDispatch } from "react-redux";

const dispatch = useDispatch()

export const PlusPostHandler = (post_id) => {
    if (checkLoggedIn()) {
        dispatch(PlusVoteOnePost(post_id))}
    else
        history.push(`/login`)

}

export const MinusPostHandler = (post_id) => {
    if (checkLoggedIn()) {
        if (post_likes <= 0)
            return
        dispatch(MinusVoteOnePost(post_id))
    }
    else
        history.push(`/login`)
}

export const PlusCommentHandler = (post_id) => {
    if (checkLoggedIn()) {
        dispatch(PlusVoteComment(post_id))}
    else
        history.push(`/login`)

}

export const MinusCommentHandler = (post_id, post_likes) => {
    if (checkLoggedIn()) {
        if (post_likes <= 0)
            return
        dispatch(MinusVoteComment(post_id))
    }
    else
        history.push(`/login`)
}
