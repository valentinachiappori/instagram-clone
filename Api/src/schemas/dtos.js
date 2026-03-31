export const simpleUserDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        image: user.image,
    };
}

export const commentDTO = (comment) => {
    return {
        id: comment.id,
        body: comment.body,
        user: simpleUserDTO(comment.user),
    };
}

export const simplePostDTO = (post) => {
    return {
        id: post.id,
        description: post.description,
        image: post.image,
        user: simpleUserDTO(post.user),
        date: post.date,
        comments: post.comments.map(commentDTO),
        likes: post.likes.map(simpleUserDTO),
    };
}

export const userDTO = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        followers: user.followers.map(simpleUserDTO),
    };
}