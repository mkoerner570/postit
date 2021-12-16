const upVoteHandler = (post_id) => {
    if (checkLoggedIn()) {
        props.upVoteSinglePost(post_id)
        props.upVotePost(post_id)
        axios.put(`/api/post/upvote/${post_id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    else
        history.push(`/login`)

}

const downVoteHandler = (post_id, post_likes) => {
    if (checkLoggedIn()) {
        if (post_likes <= 0)
            return
        props.downVoteSinglePost(post_id)
        axios.put(`/api/post/downvote/${post_id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    else
        history.push(`/login`)
}

const deletePostHandler = (post_id) => {
    axiosWithAuth().delete(`/api/post/${post_id}`)
        .then(res => {
            props.deletePost(post_id)
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
}
