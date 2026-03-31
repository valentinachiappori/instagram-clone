export const mapSimpleUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        image: user.image,
    };
}

export const mapComment = (comment) => {
    return {
        id: comment.id,
        body: comment.body,
        user: mapSimpleUser(comment.user),
    };
}

export const mapSimplePost = (post) => {
    return {
        id: post.id,
        description: post.description,
        image: post.image,
        user: mapSimpleUser(post.user),
        date: post.date,
        comments: post.comments.map(mapComment),
        likes: post.likes.map(mapSimpleUser),
    };
}

export const mapUser = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        followers: user.followers.map(mapSimpleUser),
    };
}