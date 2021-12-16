import { PlusVoteComment,MinusVoteComment,PlusVoteOneComment,MinusVoteOneComment } from "../store/votecomment"
import { PlusVotePost,MinusVotePost,PlusVoteOnePost,MinusVoteOnePost } from "../store/votepost"
import { useDispatch } from "react-redux";

const dispatch = useDispatch()

const PlusPostHandler = (post_id) => {
    if (checkLoggedIn()) {
        props.upVoteSinglePost(post_id)
        props.upVotePost(post_id)
        dispatch(PlusVoteOnePost(post_id))}
    else
        history.push(`/login`)

}

const MinusPostHandler = (post_id, post_likes) => {
    if (checkLoggedIn()) {
        if (post_likes <= 0)
            return
        props.downVoteSinglePost(post_id)
        dispatch(MinusVoteOnePost(post_id))
    }
    else
        history.push(`/login`)
}

const PlusCommentHandler = (post_id) => {
    if (checkLoggedIn()) {
        props.upVoteSinglePost(post_id)
        props.upVotePost(post_id)
        dispatch(PlusVoteComment(post_id))}
    else
        history.push(`/login`)

}

const MinusCommentHandler = (post_id, post_likes) => {
    if (checkLoggedIn()) {
        if (post_likes <= 0)
            return
        props.downVoteSinglePost(post_id)
        dispatch(MinusVoteComment(post_id))
    }
    else
        history.push(`/login`)
}
